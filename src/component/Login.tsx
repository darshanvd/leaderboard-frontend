import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graqhql/Mutations';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/loginSlice';
import Snackbar, { type SnackbarState } from './common/Snackbar';

interface LoginProps {
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: '',
        open: false,
        type: 'info',
    });

    const [login, { loading }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            dispatch(loginSuccess({
                name: data?.login.name ?? '',
                userId: data?.login.userId ?? '',
                email: data?.login.email ?? '',
                isLoggedIn: true
            }));
            onClose();
        },
        onError: (err) => {
            const msg = err?.graphQLErrors?.[0]?.message || err?.message || 'Login failed';
            setSnackbar({ message: msg, open: true, type: 'error' });
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ variables: { email, password } });
    };

    return (
        <>
            <Snackbar snackbar={snackbar} />
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50 modal-backdrop">
                <div className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email ID"
                            className="border-0 border-b-2 border-gray-300 rounded-none px-0 py-2 focus:outline-none focus:border-blue-400 bg-transparent"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-0 border-b-2 border-gray-300 rounded-none px-0 py-2 focus:outline-none focus:border-blue-400 bg-transparent"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="text-blue-text font-semibold px-4 py-2 rounded hover:underline focus:outline-none bg-transparent disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
