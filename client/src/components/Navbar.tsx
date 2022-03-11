import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../routes';

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut } = useActions();
  const { isAuth, user } = useTypedSelector((state) => state.auth);

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
            <Menu.Item key={1} style={{ color: 'white' }}>
              {user.username}
            </Menu.Item>
            <Menu.Item key={2} onClick={() => signOut()}>
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
