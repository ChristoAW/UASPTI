export default function Login({ setIsLoggedIn }) {
  return (
    <form className="form-signin">
      <input type="text" className="form-control" placeholder="Username" />
      <button
        onClick={() => setIsLoggedIn(true)}
        className="btn btn-lg btn-primary btn-block"
      >
        LOGIN
      </button>
    </form>
  );
}
