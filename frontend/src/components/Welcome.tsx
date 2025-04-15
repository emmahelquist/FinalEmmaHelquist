import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome to the Entertainment Website</h1>
      <h3>Click on the button below to view our entertainers!</h3>
      <p>Made by Emma Helquist, section 4</p>
      <br />
      <button onClick={() => navigate('/AllEntertainers')}>Let's Go!</button>
    </>
  );
}

export default Welcome;
