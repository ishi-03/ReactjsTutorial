import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList';
import Users from './components/users';

function Library() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <BookList name="Ishu" age="12"></BookList>
          <Users name= "Ansh" age = "15"> </Users>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Library;
