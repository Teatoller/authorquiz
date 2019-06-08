import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import {shuffle, sample} from 'underscore';
import * as serviceWorker from './serviceWorker';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpeg',
        imageSource: 'Wikipedia Commons',
        books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpeg',
        imageSource: 'Wikipedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
        name: 'J.K Rowling',
        imageUrl: 'images/authors/jkrowling.jpeg',
        imageSource: 'Wikipedia Commons',
        books: ['Harry Porter and the Socerers Stone']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpeg',
        imageSource: 'Wikipedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpeg',
        imageSource: 'Wikipedia Commons',
        books: ['The Shinning', 'IT']
    },
    {
        name: 'William Shakespear',
        imageUrl: 'images/authors/williamshakespear.jpeg',
        imageSource: 'Wikipedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
    }
};

const state = {
    turnData: getTurnData(authors)
};


ReactDOM.render(<AuthorQuiz {...state} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
