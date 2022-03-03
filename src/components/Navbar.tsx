import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../routes';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);
  return (
    <Layout.Header>
      {isAuth ? (
        <>
          <Menu
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            theme="dark"
            mode="horizontal"
            selectable={false}
          >
            <Menu.Item style={{ color: 'white' }}>Ilias</Menu.Item>
            <Menu.Item key={1} onClick={() => navigate(RouteNames.LOGIN)}>
              Sign out
            </Menu.Item>
          </Menu>
        </>
      ) : (
        <Menu
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          theme="dark"
          mode="horizontal"
          selectable={false}
        >
          <Menu.Item key={1} onClick={() => navigate(RouteNames.LOGIN)}>
            Sign in
          </Menu.Item>
        </Menu>
      )}
    </Layout.Header>
  );
};

export default Navbar;
