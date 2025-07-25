import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { GET_ALL_PLAYERS } from '../../graqhql/Query';
import PlayerList from '../PlayerList';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../rootReducer'; // adjust path as needed
import { CREATE_PLAYER, DELETE_PLAYER, UPDATE_PLAYER } from '../../graqhql/Mutations';

const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        players: { players: [] },
        login: {
            isLoggedIn: true,
            email: '',
            name: '',
            userId: ''
        },
    },
});

const mocks = [
    {
        request: {
            query: GET_ALL_PLAYERS,
        },
        result: {
            data: {
                getAllPlayers: [
                    {
                        playerId: '1',
                        name: 'Test Player',
                        score: 100,
                        updatedAt: '2025-07-24T12:48:18.900Z',
                        createdAt: '2025-07-24T12:25:15.875Z',
                        __typename: 'Player',
                    }
                ],
            },
        },
    },
    {
        request: {
            query: UPDATE_PLAYER,
            variables: {
                playerInput: {
                    playerId: '1', name: 'Updated Player', score: 200, updatedAt: '2025-07-24T12:48:18.900Z',
                    createdAt: '2025-07-24T12:25:15.875Z'
                }
            },
        },
        result: {
            data: {
                updatePlayer: {
                    playerId: '1',
                    name: 'Updated Player',
                    score: 200,
                    updatedAt: '2025-07-24T13:10:00.000Z',
                    createdAt: '2025-07-24T12:25:15.875Z',
                    __typename: 'Player',
                },
            },
        },
    },
    {
        request: {
            query: CREATE_PLAYER,
            variables: {
                playerInput: {
                    playerId: '', name: 'Create Player', score: 300
                }
            },
        },
        result: {
            data: {
                createPlayer: {
                    playerId: '2',
                    name: 'Create Player',
                    score: 300,
                    updatedAt: '2025-07-24T13:00:00.000Z',
                    createdAt: '2025-07-24T13:00:00.000Z',
                    __typename: 'Player',
                },
            },
        },
    },
    {
        request: {
            query: DELETE_PLAYER,
            variables: {
                playerId: '1'
            },
        },
        result: {
            data: {
                deletePlayer: {
                    playerId: '1',
                    name: 'Test Player',
                    score: 400,
                    updatedAt: '2025-07-24T13:00:00.000Z',
                    createdAt: '2025-07-24T13:00:00.000Z',
                    __typename: 'Player',
                },
            },
        },
    },
];

const setup = () => render(
    <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
            <PlayerList />
        </Provider>
    </MockedProvider>
);
describe('PlayerList', () => {
    test('renders player row when data is returned', async () => {
        const { getByText } = setup();
        await waitFor(() => {
            expect(getByText('Test Player')).toBeInTheDocument();
            expect(getByText('100')).toBeInTheDocument();
        });
    });

    test('shows empty message when there are no players', async () => {
        const emptyMocks = [
            {
                request: { query: GET_ALL_PLAYERS },
                result: { data: { getAllPlayers: [] } },
            },
        ];
        const { findByText } = render(
            <MockedProvider mocks={emptyMocks} addTypename={false}>
                <Provider store={store}>
                    <PlayerList />
                </Provider>
            </MockedProvider>
        );
        expect(await findByText('There are not players.')).toBeInTheDocument();
    });
    test('shows loader while fetching players', async () => {
        const { getByRole } = setup();
        expect(getByRole('loading')).toBeInTheDocument();
    });


    test('shows snackbar with error message when query fails', async () => {
        const errorMocks = [
            {
                request: { query: GET_ALL_PLAYERS },
                error: new Error('GraphQL error!'),
            },
        ];
        const { findByText } = render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <Provider store={store}>
                    <PlayerList />
                </Provider>
            </MockedProvider>
        );
        expect(await findByText('GraphQL error!')).toBeInTheDocument();
    });

    test('create player mutation', async () => {
        const { getByRole, findByText, findByPlaceholderText, findByRole } = setup();
        await waitFor(() => {
            fireEvent.click(getByRole("button", { name: /Add Player/i }));
        });
        const nameInput = await findByPlaceholderText(/name/i);
        const scoreInput = await findByPlaceholderText(/score/i);
        fireEvent.change(nameInput, { target: { value: 'Create Player' } });
        fireEvent.change(scoreInput, { target: { value: '300' } });
        const saveButton = await findByRole("button", { name: /Save/i });
        fireEvent.click(saveButton);
        expect(await findByText(/Create Player/i)).toBeInTheDocument();
        expect(await findByText(/300/i)).toBeInTheDocument();

    });

    test('update player mutation', async () => {
        const { getByRole, findByText, findByPlaceholderText, findByRole } = setup();
        await waitFor(() => {
            fireEvent.click(getByRole("button", { name: /Edit/i }));
        });
        const nameInput = await findByPlaceholderText(/name/i);
        const scoreInput = await findByPlaceholderText(/score/i);
        fireEvent.change(nameInput, { target: { value: 'Updated Player' } });
        fireEvent.change(scoreInput, { target: { value: '200' } });
        const saveButton = await findByRole("button", { name: /Save/i });
        fireEvent.click(saveButton);
        expect(await findByText(/Updated Player/i)).toBeInTheDocument();
    });
});
