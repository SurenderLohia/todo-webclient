import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

import { Button } from "@/components/ui/button"

const Count = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </div>
  );
};

export default Count;