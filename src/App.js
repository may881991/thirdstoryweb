import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookLists from './components/BookLists/BookLists';
import Activities from './components/Activities/Activities';
import BookDetails from './components/BookDetails/BookDetails';
import AboutUs from './components/About/About';
import ReadBook from './components/Reader/Reader';
import Order from './components/Order/Order';
import LogIn from './components/LogIn/Login';
import Gallery from './components/Gallery/Gallery';
import Stories from './components/Stories/Stories';
import SignUp from './components/SignUp/SignUp'; 
import Home from './components/Home/Home'
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/books" element={<BookLists />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/bookDetails" element={<BookDetails />} />
            <Route path="/read" element={<ReadBook />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/stories" element={<Stories />} />
          </Routes>
      </Router>
    </div>
  );
}
export default App;