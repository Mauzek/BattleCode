import ProfileEditScreen from "@/screens/profile/ProfileEdit/ProfileEditScreen";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const ProfileEdit = () => {
  const { username } = useParams<{ username: string }>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  
  const isOwner = currentUser && username && currentUser.username === username;
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isOwner) {
    return <Navigate to="/" replace />;
  }
  
  return <ProfileEditScreen />;
};

export default ProfileEdit;