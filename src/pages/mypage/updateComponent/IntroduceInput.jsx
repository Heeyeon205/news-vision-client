export default function setIntroduce({ introduce, setIntroduce }) {
  return (
    <>
      <label>소개</label>
      <p>나누고 싶은 지식이나 내 관심사를 소개해 주세요.</p>
      <textarea
        value={introduce}
        onChange={(e) => setIntroduce(e.target.value)}
      />{" "}
      <br />
    </>
  );
}
