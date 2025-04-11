import '../css/Header.css';

const Header = () => {
  return (
    <div className="game-header1">
      <div className="user-info1">
        <img src="https://www.freeiconspng.com/uploads/pubg-circle-battlegrounds-photo-23.png" alt="Profile" />
        <span>{user.name}</span>
      </div>
      <div className="balance-info1">
        <span><b>{user.balance}</b> so'm</span>
      </div>
    </div>
  );
};

export default Header;