import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import "../../styles/theme-user-profile.css";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { FiSettings } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import RoleEnum from "../../enums/RoleEnum";
import MyCoursesComponent from "../../components/teacher/MyCoursesComponent";
import { useEffect } from "react";
import { useDisplayName } from "../../hooks/useDisplayName";

import { getUserById } from "../../api/user";
import SmallLoading from "../../components/loading/SmallLoading";
import { getProfile } from "../../api/profile";
import { useUserId } from "../../hooks/useUserId";
import UserPostsPane from "../../components/user/UserPostsPane";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userRole = useRole();
  const isOwnProfile = location.pathname === "/user/me";
  const displayName = useDisplayName();
  const userId = useUserId();
  const [user, setUser] = useState({ displayName, userRole });
  const [userProfile, setUserProfile] = useState(null);
  const params = useParams();

  const loadUser = async () => {
    setLoading(true);
    try {
      const response = await getUserById(params.id);
      const role = response.data.role[0];
      setUser({...response.data, userRole: role});
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  const loadUserProfile = async () => {
    try {
        const response = await getProfile(isOwnProfile ? userId : params.id);
        setUserProfile(response.data);
    } catch (error) {
        console.log(error);
    }
}

  useEffect(() => {
    if(!isOwnProfile) {
      loadUser();
    } else {
      setUser({ displayName, userRole });
    }
    loadUserProfile();
  }, [isOwnProfile, params.id]);
  
  return (
    <AppLayout>
      <CustomBreadcrumb title="Kullanıcı Profili" />

      <Container>
        {
          loading ? <SmallLoading /> :
          <div className="profile-page tx-13">
          <Row>
            <Col md={12} className="grid-margin">
              <div className="profile-header">
                <div className="cover">
                  <div className="cover-body d-flex justify-content-between align-items-center">
                    <div className="profile-pic-container">
                      <Avatar name={user?.displayName ? user.displayName : "Kullanıcı"} size={70} />
                      <span className="profile-name">{user?.displayName ? user.displayName : "Kullanıcı"}</span>
                    </div>
                    <div className="d-none d-md-block">
                      {isOwnProfile && (
                        <Link to="/user/options">
                          <button className="btn edit-btn blue-btn">
                            <FiSettings size={20} className="mx-1" />
                            Ayarlar
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="profile-body">
            <Col md={4} className="d-none d-md-block left-wrapper">
              <div className="card rounded">
                <div className="card-body">
                  <div className="badge bg-primary mb-3">
                    {user?.userRole}
                  </div>
                  <hr />
                  <div><b>Eğitim: </b> {userProfile && userProfile.education}</div>
                  <hr />
                  <div><b>İlgi Alanları: </b> {userProfile && userProfile.interests}</div>
                </div>
              </div>
            </Col>

            <Col md={8} className="middle-wrapper">
              <Tabs defaultActiveKey={user?.userRole === RoleEnum.Teacher ? "courses" : "posts"}>
                {
                 user?.userRole === RoleEnum.Teacher && 
                 <Tab eventKey="courses" title="Kurslar">
                    <MyCoursesComponent isProfileSection={true} id={isOwnProfile ? userId : params.id} />
                  </Tab>
                }
                {isOwnProfile && (
                  <Tab eventKey="posts" title="Gönderiler">
                    <UserPostsPane userId={isOwnProfile ? userId : params.id} />
                  </Tab>
                )}
              </Tabs>
            </Col>
          </Row>
        </div>
        }
      </Container>
    </AppLayout>
  );
};

export default UserProfile;
