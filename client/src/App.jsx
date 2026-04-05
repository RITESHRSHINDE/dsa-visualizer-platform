import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BubbleSort from './pages/algorithms/BubbleSort';
import SelectionSort from './pages/algorithms/SelectionSort';
import InsertionSort from './pages/algorithms/InsertionSort';
import MergeSort from './pages/algorithms/MergeSort';
import Stack from './pages/data-structures/Stack';
import LinkedList from './pages/data-structures/LinkedList';
import Tree from './pages/data-structures/Tree';
import Queue from './pages/data-structures/Queue';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="algorithms/bubble-sort" element={<BubbleSort />} />
        <Route path="algorithms/selection-sort" element={<SelectionSort />} />
        <Route path="algorithms/insertion-sort" element={<InsertionSort />} />
        <Route path="algorithms/merge-sort" element={<MergeSort />} />
        <Route path="data-structures/stack" element={<Stack />} />
        <Route path="data-structures/linked-list" element={<LinkedList />} />
        <Route path="data-structures/tree" element={<Tree />} />
        <Route path="data-structures/queue" element={<Queue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
