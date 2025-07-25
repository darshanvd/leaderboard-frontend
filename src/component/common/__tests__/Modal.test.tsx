
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from '../Modal';

describe('Modal', () => {
  test('renders title and children when open', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Test Modal">
        Modal Content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render when open is false', () => {
    render(
      <Modal open={false} onClose={vi.fn()} title="Should not show">
        Hidden Content
      </Modal>
    );
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Overlay Close">
        Content
      </Modal>
    );
    fireEvent.click(screen.getByText('Content').closest('.fixed')!);
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Button Close">
        Content
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
