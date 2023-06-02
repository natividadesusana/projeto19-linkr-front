import { AiOutlineDown } from "react-icons/ai";
import { Container, Title, UserImage, Icon, Menu, LogoutOption } from "./styled";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import userIcon from "../../assets/images/userIcon.jpeg";
import { useLogout } from "../../services/auth";

export default function Header() {
  const { picture_url } = useContext(AuthContext);
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const logout = useLogout();

  const handleIconClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  
  return (
    <Container>
      <Title>linkr</Title>
      <Menu>
      <Icon onClick={handleIconClick}>
          <AiOutlineDown />
        </Icon>
        <UserImage src={!picture_url ? userIcon : picture_url} alt="User Image" />
        {showLogoutOption && (
          <LogoutOption onClick={logout}>
            Logout
          </LogoutOption>
        )}
      </Menu>
    </Container>
  );
}
