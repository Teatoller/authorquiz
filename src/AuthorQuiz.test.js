import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const state = {
    turnData: {
        books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It'],
        author: {
            name: 'Mark Twain',
            imageUrl: 'images/authors/marktwain.jpeg',
            imageSource: 'Wikipedia Commons',
            books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
        },
    },
    highlight: 'none'
};

describe("Authour Quiz", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {
        }}/>, div);
    });

    describe("When no answer has been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {
            }}/>);
        });
        it('Should have no background color', () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
        });
    });

    describe("When the wrong answer has been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(
                <AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {
                }}/>);
        });
        it('Should have a red background color', () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
        });
    });

    describe("When the correct answer has been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(
                <AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {
                }}/>);
        });
        it('Should have a red background color', () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
        });
    });

    describe("When the correct answer has been selected", () => {
        let wrapper;
        const handleAnswerSelected = jest.fn();
        beforeAll(() => {
            wrapper = mount(
                <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);
            wrapper.find('answer').first().simulate('click');

            it('onAnswerselected on answer should be called', () => {
                expect(handleAnswerSelected).toHaveBeenCalled();
            });

            it('should receive The Adventures of Huckleberry Finn ', () => {
              expect(handleAnswerSelected).toHaveBeenCalledWith('The Adventures of Huckleberry Finn');
          });

        });
    });
});

