import { useState } from "react";
import { Card, Row, Col, Button, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import AddQuestion from "../../../components/add-question";
import TopBar from "../../../components/tob-bar";
import Feed from "../houses/feed/Feed";
const Home = () => {
  const [isModalOpen, setModal] = useState(false);

  const handlePaginationChange = (page) => {
    /**
     * TODO: Handle pagination change
     */
  };

  const handleBookClick = (page) => {
    /**
     * TODO: Handle book click
     */
  };

  return (
    <>
      <TopBar />
      {/* Page div */}
      <div
        style={{
          marginTop: "20px",
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        {/* Add book */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button
            type="default"
            style={{ width: "100px" }}
            onClick={() => setModal(true)}
          >
            <PlusOutlined />
            Add
          </Button>
        </div>
        
        <>
        <Feed/>
          {/* <Row gutter={16}>
            <Col span={5} onClick={handleBookClick}>
              <Card
                hoverable
                cover={
                  <img
                    src={`https://picsum.photos/200/300`}
                    alt="This is alt"
                  />
                }
              >
                <Card.Meta
                  title="You don't know JS"
                  description="This is the book description"
                />
              </Card>
            </Col>
          </Row> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Pagination
              defaultCurrent={3}
              total={3}
              onChange={handlePaginationChange}
            />
          </div>

        </>
        )
        <AddQuestion isOpen={isModalOpen} onClose={() => setModal(false)} />
      </div>
    </>
  );
};
export default Home;
