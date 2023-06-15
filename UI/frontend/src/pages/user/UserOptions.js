import React, { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import "../../styles/theme-user-profile.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useDisplayName } from "../../hooks/useDisplayName";
import { useIsWalletConnected } from "../../hooks/useİsWalletConnected";
import { useAccount } from "../../hooks/useAccount";
import { toast } from "react-toastify";
import { useContract } from "../../hooks/useContract";
import { convertBigNumberToNumber } from "../../helpers/converter";
import ProfileUpdate from "../../components/options/ProfileUpdate";

const UserOptions = () => {
  const [balance, setBalance] = useState(null);
  const displayName = useDisplayName();
  const isWalletConnected = useIsWalletConnected();
  const account = useAccount();
  const transferContract = useContract();

    const loadBalance = async () => {
        try {
            const balance = await transferContract.getBalance(account);
            if(balance) {
              setBalance(convertBigNumberToNumber(balance));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadBalance();
    },[account]);

  const withdrawMyBalance = async () => {
    try {
        const transaction = await transferContract.withdrawBalance();
        await transaction.wait();
        setBalance(0);
        toast.success("Bakiyeniz hesabınıza başarıyla aktarıldı!");
      } catch (error) {
        toast.error("Bakiyeniz hesabınıza aktarılamadı!");
      }
  }

  return (
    <AppLayout>
      <CustomBreadcrumb title="Ayarlar" />

      <Container>
        <div className="profile-page tx-13">
          <Row>
            <Col md={12} className="grid-margin">
              <div className="profile-header">
                <div className="cover">
                  <div className="cover-body d-flex justify-content-between align-items-center">
                    <div className="profile-pic-container">
                      <Avatar name={displayName} size={70} />
                      <span className="profile-name">{displayName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="profile-body">
            <Col md={12} className="middle-wrapper">
                <Row className="mt-5">
                    <Col md={4}>
                        <h3>KozmosEdu Bakiyem</h3>
                    </Col>
                    <Col md={8}>
                        <div className="d-flex align-items-baseline">
                            <Button onClick={() => withdrawMyBalance()} disabled={!isWalletConnected} className="black-btn">{balance} ETH Bakiyemi Cüzdanıma Aktar</Button>
                        </div>
                    </Col>
                </Row>

                <hr />

                <Row className="mt-5">
                    <Col md={4}>
                        <h3>Profil Bilgilerim</h3>
                    </Col>
                    <Col md={8}>
                        <ProfileUpdate />
                    </Col>
                </Row>

            </Col>
          </Row>
        </div>
      </Container>
    </AppLayout>
  );
};

export default UserOptions;
