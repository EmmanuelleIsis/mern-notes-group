import { fireEvent, render, screen } from '@testing-library/react';
import Note from './Note';

const note = {
    _id: 'team-note',
    title: 'Team note',
    text: 'Review before merging',
    createdAt: '2026-01-01T12:00:00Z',
    updatedAt: '2026-01-01T12:00:00Z',
};

test('delete button deletes once without opening the note', () => {
    const open = jest.fn();
    const remove = jest.fn();
    render(<Note note={note} onNoteClicked={open} onDeleteNoteClicked={remove} />);
    const button = screen.getByRole('button', { name: 'Delete note: Team note' });
    expect(button).toHaveAttribute('type', 'button');
    fireEvent.click(button);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(note);
    expect(open).not.toHaveBeenCalled();
});

test('clicking the title opens the note without deleting it', () => {
    const open = jest.fn();
    const remove = jest.fn();
    render(<Note note={note} onNoteClicked={open} onDeleteNoteClicked={remove} />);
    fireEvent.click(screen.getByText('Team note'));
    expect(open).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith(note);
    expect(remove).not.toHaveBeenCalled();
});