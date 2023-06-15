import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import LectureDragItem from "./LectureDragItem";
import CreateNewLecture from "./CreateNewLecture";
import BackPage from "../../../BackPage";
import { useEffect } from "react";
import { createLecture, deleteLecture, getLectures, updateLecture } from "../../../../api/agent";
import {createLectureMaterial, deleteLectureMaterial, getLectureMaterial} from "../../../../api/lectureMaterial";

const SectionLecturesEditPane = ({ section, setSelectedSection }) => {
  const [show, setShow] = useState(false);
  const [lectures, setLectures] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const loadLectures = async () => {
    const response = await getLectures(section.id);
    setLectures(response.data);
  }

  useEffect(() => {
    loadLectures();
  }, []);

  const createLectureFunc = async (values) => {
    const {courseModuleId, title, content, file} = values;
    try {
      let maxNum = 0;
      lectures.forEach(x => {
        maxNum = x.order>maxNum ? x.order : maxNum;
      });

      values.order = maxNum+1;
      const response = await createLecture({courseModuleId, title, content, order: values.order});
      setLectures((oldValues) => [
        ...oldValues,
        { ...values, id: response.data.id },
      ]);

      await createLectureMaterial(response.data.id, file);
      toast.success("Modül dersi başarıyla oluşturuldu!");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Modül dersi oluşturulurken bir hatayla karşılaşıldı!");
    }
    
  };

  const updateLectureFunc = async (item) => {
    const {id, courseModuleId, title, content, file} = item;
    try {
      await updateLecture({id, courseModuleId, title, content});
      if(file) {
        const {data} = await getLectureMaterial(id);
        await deleteLectureMaterial(data.id);
        console.log(data);
        await createLectureMaterial(id, file);
      }
      setLectures(oldLectures => {
        const newArray = [];
        oldLectures.forEach(x => {
          if(x.id === item.id) {
              x.title = item.title;
              x.content = item.content;
              x.courseModuleId = item.courseModuleId;
          }
          if(x.courseModuleId === section.id) {
            newArray.push(x);
          }
        })
        return [...newArray];
      })
      toast.success("Ders başarıyla güncellendi");
    } catch (error) {
      console.log(error);
      toast.error("Ders güncellenirken hata oluştu!");
    }
  }

  const updateLectureOrders = async () => {
    try {
      lectures.forEach(async (lecture,index) => {
        await updateLecture({...lecture, order:index+1});
      });
      toast.success("Modül dersleri başarıyla sıralandı!");
    } catch (error) {
      toast.error("Modül dersleri sıralanırken bir hatayla karşılaşıldı!");
    }
  };

  const deleteLectureFunc = async (lectureId) => {
    try {
      await deleteLecture(lectureId);
      setLectures((oldLectures) => {
        const newArray = [];
        oldLectures.forEach((x) => {
          if (x.id !== lectureId) {
            newArray.push(x);
          }
        });
        return [...newArray];
      });
      toast.success("Ders başarıyla silindi");
    } catch (error) {
      toast.error("Ders silinirken hata oluştu!");
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    setLectures(reorder(lectures, source.index, destination.index));
  };

  return (
    <Fragment>
      <CreateNewLecture
        show={show}
        handleClose={handleClose}
        createLecture={createLectureFunc}
        section={section}
      />
      <Row className="mt-4">
        <Col>
          <BackPage func={() => setSelectedSection(null)} />
        </Col>
        <Col>
          <div className="align-right">
            <Button className="green-btn" onClick={handleShow}>
              Ders Oluştur
            </Button>
          </div>
        </Col>
      </Row>

      <h3>{section.title} | Modül Dersleri</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {lectures.map((item, index) => (
                <LectureDragItem
                  key={item.id}
                  index={index}
                  item={item}
                  deleteLecture={deleteLectureFunc}
                  updateLecture={updateLectureFunc}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="align-right mt-4">
        <Button
          onClick={() => updateLectureOrders()}
          size="sm"
          className="black-btn"
        >
          Sıralamayı Güncelle
        </Button>
      </div>
    </Fragment>
  );
};

export default SectionLecturesEditPane;
