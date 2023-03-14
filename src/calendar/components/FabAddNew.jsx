import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { onOpenModal } = useUiStore();
  const { setActiveElement } = useCalendarStore();
  const handleClickNew = () => {
    setActiveElement({
      title: "",
      notes: "",
    });
    onOpenModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
