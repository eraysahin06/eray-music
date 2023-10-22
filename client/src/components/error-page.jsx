import { useRouteError } from 'react-router-dom';
import Navbar from './Navbar';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <Navbar />
      <h1>Oops!</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
