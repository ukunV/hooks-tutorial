import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const avg = useMemo(() => getAverage(list), [list]);
  // useMemo를 사용하지 않을 때에는 input 내용이 수정될때도 getAverage 함수가 호출되지만
  // useMemo를 사용하면 렌더링하는 과정에서 특정 값[list]이 바뀌었을 때만 연산을 실행하고,
  // 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용한다. ==> 렌더링 성능 최적화

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b> {avg}
      </div>
    </div>
  );
};

export default Average;
