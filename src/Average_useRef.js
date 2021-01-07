import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  // useCallback은 useMemo와 상당히 비슷한 함수이다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용한다.
  // 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.
  // useCallback을 사용하지 않으면 컴포넌트가 리렌더링될 때마다 함수들이 새로 생섣된다.
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus();
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);
  // useMemo를 사용하지 않을 때에는 input 내용이 수정될때도 getAverage 함수가 호출되지만
  // useMemo를 사용하면 렌더링하는 과정에서 특정 값[list]이 바뀌었을 때만 연산을 실행하고,
  // 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용한다. ==> 렌더링 성능 최적화

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
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
