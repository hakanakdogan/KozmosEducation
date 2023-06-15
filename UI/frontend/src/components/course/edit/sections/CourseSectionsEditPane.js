import React from "react";
import { Fragment } from "react";
import CreateNewSection from "./CreateNewSection";
import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  createCourseModule,
  deleteCourseModule,
  updateCourseModule,
} from "../../../../api/agent";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DragItem from "./DragItem";
import { toast } from "react-toastify";
import SectionLecturesEditPane from "../lectures/SectionLecturesEditPane";

const CourseSectionsEditPane = ({ course }) => {
  const [show, setShow] = useState(false);
  const [sections, setSections] = useState(course.courseModules.sort((a, b) => (a.order > b.order) ? 1 : -1));
  const [selectedSection, setSelectedSection] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createSection = async (values) => {
    try {
      let maxNum = 0;
      sections.forEach(x => {
        maxNum = x.order>maxNum ? x.order : maxNum;
      });

      [values.order, values.courseId] = [maxNum+1, course.courseId];
      const response = await createCourseModule(values);
      toast.success("Kurs modülü başarıyla oluşturuldu!");
      setSections((oldValues) => [
        ...oldValues,
        { ...values, id: response.data.id },
      ]);
      handleClose();
    } catch (error) {
      toast.error("Kurs modülü oluşturulurken bir hatayla karşılaşıldı!");
    }
  };

  const updateModuleOrders = async () => {
    try {
      sections.forEach(async (section,index) => {
        await updateCourseModule({...section, order:index+1});
      });

      toast.success("Kurs modülleri başarıyla sıralandı!");
    } catch (error) {
      toast.error("Kurs modülleri sıralanırken bir hatayla karşılaşıldı!");
    }
  };

  const updateModuleName = async (item) => {
    try {
      await updateCourseModule(item);
      setSections(oldSections => {
        const newArray = [];
        oldSections.forEach(x => {
          if(x.id === item.id) {
            x.title = item.title;
          }
          newArray.push(x);
        })
        return [...newArray];
      })
      toast.success("Modül başarıyla güncellendi");
    } catch (error) {
      toast.error("Modül güncellenirken hata oluştu!");
    }
  }

  const deleteModule = async (moduleId) => {
    try {
      await deleteCourseModule(moduleId);
      setSections(oldSections => {
        const newArray = [];
        oldSections.forEach(x => {
          if(x.id !== moduleId) {
            newArray.push(x);
          }
        })
        return [...newArray];
      })
      toast.success("Modül başarıyla silindi");
    } catch (error) {
      toast.error("Modül silinirken hata oluştu!");
    }
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    setSections(reorder(sections, source.index, destination.index));
  };

  return selectedSection !== null 
  ? <SectionLecturesEditPane setSelectedSection={setSelectedSection} section={selectedSection} />
  : (
    <Fragment>
      <CreateNewSection
        show={show}
        handleClose={handleClose}
        createSection={createSection}
      />

      <div className="align-right mt-4">
        <Button className="green-btn" onClick={handleShow}>
          Modül Oluştur
        </Button>
      </div>

      <h3>Kurs Modülleri</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((item, index) => (
                <DragItem setSelectedSection={setSelectedSection} key={item.id} index={index} item={item} updateModuleName={updateModuleName} deleteModule={deleteModule} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="align-right mt-4">
        <Button onClick={() => updateModuleOrders()} size="sm" className="black-btn">
          Sıralamayı Güncelle
        </Button>
      </div>
    </Fragment>
  );
};

export default CourseSectionsEditPane;
