// composables/useColors.ts
// type Team = "C" | "D" | "E" | "F" | "G";
// type Mission = "R2" | "R1" | "M7";

export const useColors = () => {
  const getTeamColor = (team: string): string => {
    switch (team) {
      case "C":
        return "#722F9C";
      case "D":
        return "#19B04F";
      case "E":
        return "#F6C32C";
      case "F":
        return "#1070C1";
      case "G":
        return "#BE0711";
      default:
        return "#53a4b2";
    }
  };
  //#96CCD5
  const getTeamColorSoft = (team: string) => {
    switch (team) {
      case "C":
        return "#DDD6F1";
      case "D":
        return "#B8D4C2";
      case "E":
        return "#FFF2CD";
      case "F":
        return "#DEEAF6";
      case "G":
        return "#FBD7DB";
      default:
        return "#53a4b2";
    }
  };

  const getMissionColor = (name: string): string => {
    switch (name) {
      case "R2":
        return "#50B7D6";
      case "R1":
        return "#FD90AB";
      case "M7":
        return "#FEC02C";
      default:
        return "#2A3547";
    }
  };

  return {
    getTeamColor,
    getMissionColor,
    getTeamColorSoft,
  };
};
export function formatNumber(value: number | string): string {
  // ตรวจสอบและแปลง string เป็น number หากจำเป็น
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // ตรวจสอบว่าค่าแปลงสำเร็จ (กรณี string ไม่ใช่ตัวเลข)
  if (isNaN(numericValue)) {
    throw new Error(`Invalid number: ${value}`);
  }

  return numericValue.toLocaleString(); // ใช้เครื่องหมายคั่นหลักพัน
}
// composables/useShowComponent.ts

export function shouldShowComponent(subjectIndex: any, index: number): boolean {
  // ถ้า subjectIndex ว่างหรือ undefined ให้แสดงทุก component
  if (!subjectIndex || subjectIndex.length === 0) {
    return true;
  }
  // ถ้า subjectIndex มีค่า ให้แสดง component ที่ตรงกับ index เท่านั้น
  return subjectIndex.includes(index);
}
