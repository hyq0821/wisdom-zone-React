// 房间管理页面

import { Card, Col, Radio, Row, Spin } from "antd";
import "./index.scss";

import { Image } from "antd";
import { useEffect, useState } from "react";
import { getRoomList } from "../../api/room";

interface RoomType {
  roomNumber: number;
  decorationType: "毛坯" | "精装";
  area: number;
  uniPrice: number;
  src: string;
}

function Room() {
  const [visible, setVisible] = useState<boolean>(false);
  const [room, setRoom] = useState<RoomType[]>([]);
  const [src, setSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // 加载房间信息
  const loadRoom = async (roomid: any) => {
    setLoading(true);
    const {
      data: { rooms },
    } = await getRoomList(roomid);
    setLoading(false);
    setRoom(rooms);
    
  };
  useEffect(() => {
    loadRoom("a1");
  }, []);

  const showImage = (src: string) => {
    setSrc(src);
    setVisible(true);
  };

  const handleChange = (e: any) => {
    // e----事件对象
    const roomid = e.target.value;
    loadRoom(roomid);
  };

  return (
    <div className="room">
      <Image
        width={200}
        style={{ display: "none" }}
        preview={{
          visible,
          src: src,
          onVisibleChange(value, prevValue) {
            setVisible(value);
          },
        }}
      />
      <Card className="mb">
        <Radio.Group
          defaultValue="a1"
          optionType="button"
          buttonStyle="solid"
          onChange={handleChange}
        >
          <Radio.Button value="a1">A1幢写字楼</Radio.Button>
          <Radio.Button value="a2">A2幢写字楼</Radio.Button>
          <Radio.Button value="b1">B1幢写字楼</Radio.Button>
          <Radio.Button value="b2">B2幢写字楼</Radio.Button>
          <Radio.Button value="c1">C1幢写字楼</Radio.Button>
          <Radio.Button value="c2">C2幢写字楼</Radio.Button>
          <Radio.Button value="d1">天汇国际大厦</Radio.Button>
          <Radio.Button value="d2">时代金融广场</Radio.Button>
        </Radio.Group>
      </Card>
     <Spin spinning={loading}>
       <Row gutter={16}>
        {room.map((item) => {
          return (
            <>
              <Col span={6} className="item">
                <Card
                  title="房间号"
                  extra={<a onClick={() => showImage(item.src)}>户型图</a>}
                >
                  <h1>201</h1>
                  <div className="clearfix mt">
                    <p className="fl">装修情况:</p>
                    <p className="fr">{item.decorationType}</p>
                  </div>
                  <div className="clearfix mt">
                    <p className="fl"> 房间面积:</p>
                    <p className="fr">{item.area}</p>
                  </div>
                  <div className="clearfix mt">
                    <p className="fl">出租单价:</p>
                    <p className="fr">{item.uniPrice}</p>
                  </div>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
     </Spin>
    </div>
  );
}
export default Room;
