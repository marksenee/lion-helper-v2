import { proPage } from "../apis/api";

// 체크박스 핸들러
// 체크박스 상태 변경 함수
export const handleCheckboxChange = async (
  id,
  checkedItem,
  setCheckedStates,
  setUncheckedItems
) => {
  setCheckedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  setUncheckedItems((prev) => prev.filter((item) => item.id !== id));

  try {
    await proPage.postDailyCheck({
      updates: [{ is_checked: true, task_name: checkedItem.task_name }],
    });
    console.log(`체크리스트 업데이트: ${checkedItem.task_name} 체크됨`);
  } catch (error) {
    console.error("체크 상태 업데이트 실패:", error);
  }
};

// 체크리스트 저장 함수
export const handleSaveChecklist = async (
  id,
  checkItems,
  checkedStates,
  api
) => {
  const checkedItems = checkItems
    .filter((item) => checkedStates[item.id])
    .map((item) => ({
      is_checked: true,
      task_name: item.task_name,
    }));

  try {
    const response = await proPage.api({ updates: checkedItems });
    if (response.status === 201) {
      alert("체크리스트가 저장되었습니다!");
    }
  } catch (error) {
    console.error("Error saving checklist:", error);
  }
};
