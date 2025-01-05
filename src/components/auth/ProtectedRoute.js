import React, { useContext } from "react"; // React와 useContext 훅을 가져옵니다. useContext는 전역 상태를 사용할 때 유용합니다.
import { Navigate, useLocation } from "react-router-dom"; // React Router의 컴포넌트와 훅을 가져옵니다. Navigate는 페이지 이동에 사용되고, useLocation은 현재 경로 정보를 제공합니다.
import { AuthContext } from "../../contexts/AuthContext"; // 인증 정보를 관리하는 AuthContext를 가져옵니다.
import PropTypes from "prop-types"; // PropTypes를 사용해 컴포넌트의 props 타입을 검증합니다.

const ProtectedRoute = ({ children }) => {
  // ProtectedRoute는 인증된 사용자만 접근할 수 있는 경로를 보호합니다.
  const { user } = useContext(AuthContext); // AuthContext에서 현재 로그인된 사용자 정보를 가져옵니다.
  const location = useLocation(); // 현재 페이지의 경로 및 상태를 가져옵니다.

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트합니다.
  if (!user) {
    // Navigate를 사용해 "/login" 페이지로 이동하며, 요청했던 경로 정보를 상태(state)에 저장합니다.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 인증된 사용자라면 자식 컴포넌트를 그대로 렌더링합니다.
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children은 React 노드로 전달되어야 합니다. 필수 값입니다.
};

export default ProtectedRoute; // 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.
