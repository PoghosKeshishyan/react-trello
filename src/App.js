import { useState } from 'react';

export function App() {
    const [boards, setBoards] = useState([
        { id: 1, title: 'Start', items: [
            { id: 1, title: 'React' }, 
            { id: 2, title: 'Vue' }, 
            { id: 3, title: 'Angular' }] 
        },
        { id: 2, title: 'In Process', items: [] },
        { id: 3, title: 'Finished', items: [] },
    ]);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [input, setInput] = useState('');

    const addItem = () => {
        const item = { id: Date.now(), title: input };
        let newItem = [item, ...boards[0]['items']];

        setBoards(boards.map(board => {
            if (board.id === 1) board.items = newItem;
            return board;
        }))
    }

    const submit = (e) => {
        e.preventDefault();
        addItem(input);
        setInput('');
    }

    const dragOverFunc = (e) => {
        e.preventDefault();
    }

    const dragStartFunc = (e, board, item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    const dropEndFunc = (e, board) => {
        board.items.push(currentItem);

        const index = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(index, 1);

        setBoards(boards.map(b => {
            if (b.id === board.id) return board;
            if (b.id === currentBoard.id) return currentBoard;
            return b;
        }));
    }

    const removeItem = (board, item) => {
        const index = board.items.indexOf(item);
        board.items.splice(index, 1);

        setBoards(boards.map(b => {
            if (b.id === board.id) return board;
            return b
        }));
    }

    return (
        <div className='App'>
            <h1>TRELLO with React.js</h1>

            <div className='container'>

                <form onSubmit={submit}>
                    <input
                        type='text'
                        placeholder='Your todo...'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </form>

                {
                    boards.map(board => (
                        <div
                            className='board'
                            onDragOver={e => dragOverFunc(e)}
                            onDrop={e => dropEndFunc(e, board)}
                            key={board.id}
                        >
                            <h2>{board.title}</h2>

                            {
                                board.items.map(item =>
                                    <div
                                        className='item'
                                        draggable={true}
                                        onDragOver={e => dragOverFunc(e)}
                                        onDragStart={e => dragStartFunc(e, board, item)}
                                        key={item.id}
                                    >
                                        <span>{item.title}</span>

                                        <span 
                                          className='times'
                                          onClick={() => removeItem(board, item)} 
                                        >
                                            x
                                        </span>
                                    </div>

                                )
                            }
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )

}
