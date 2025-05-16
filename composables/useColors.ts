import * as XLSX from "xlsx";
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
export function formatDate(isoString : string) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนใน JavaScript เริ่มที่ 0
  const year = String(date.getFullYear() + 543).slice(-2); // แปลงเป็น พ.ศ.

  return `${day}/${month}/${year}`;
}
export function shouldShowComponent(subjectIndex: any, index: number): boolean {
  // ถ้า subjectIndex ว่างหรือ undefined ให้แสดงทุก component
  if (!subjectIndex || subjectIndex.length === 0) {
    return true;
  }
  // ถ้า subjectIndex มีค่า ให้แสดง component ที่ตรงกับ index เท่านั้น
  return subjectIndex.includes(index);
}

export function downloadImage(imagePath: string, fileName: string){
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function downloadXLSX(data: any[][]): void {
  // const data = [
  //   ["Name", "Age", "Email"],
  //   ["Alice", 30, "alice@example.com"],
  //   ["Bob", 25, "bob@example.com"]
  // ];
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "ตัวอย่างไฟล์.xlsx");
}
export function downloadCSV(
  data: any[][] | Record<string, any>[],
  filename: string = 'data.csv'
): void {
  if (!data || data.length === 0) return;

  let csvRows: string[] = [];

  // ถ้าเป็น array of objects
  if (!Array.isArray(data[0])) {
    const objArray = data as Record<string, any>[];
    const headers = Object.keys(objArray[0]);
    csvRows.push(headers.join(','));

    objArray.forEach(row => {
      const values = headers.map(key => {
        const cell = String(row[key] ?? '');
        const safeCell = /^[=+\-@]/.test(cell) ? `'${cell}` : cell;
        return `"${safeCell.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    });

  } else {
    // ถ้าเป็น array of arrays
    const arrayData = data as any[][];
    csvRows = arrayData.map(row =>
      row.map(cell => {
        const cellStr = String(cell ?? '');
        const safeCell = /^[=+\-@]/.test(cellStr) ? `'${cellStr}` : cellStr;
        return `"${safeCell.replace(/"/g, '""')}"`;
      }).join(',')
    );
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



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
    // console.log(team);
    
    switch (team) {
      case "A":
        return "#FAD0C4";
      case "B":
        return "#FFF7F3";
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
      case "R12":
        return "#F4D5A2";
      case "R11":
        return "#845730";
      case "R10":
        return "#043C5A";
      case "R9":
        return "#F0AA64";
      case "R8":
        return "#718C69";
      case "R7":
        return "#FCF3E4";
      case "R6":
        return "#E0F2F4";
      case "R5":
        return "#FFDBDF";
      case "R4":
        return "#BAD6DA";
      case "R3":
        return "#4B8634";
      case "R2":
        return "#FFE797";
      case "R1":
        return "#FD90AB";
      case "M1":
        return "#6C903C";
      case "M2":
        return "#F49514";
      case "M3":
        return "#B2DEDE";
      case "M4":
        return "#D6B2DE";
      case "M5":
        return "#671D1D";
      case "M6":
        return "#D6D677";
      case "M7":
        return "#FEC02C";
      case "M8":
        return "#AA7081";
      case "หัวข้อประสาน":
        return "#289185";
      default:
        return "#2A3547";
    }
  };

  const getMissionName = (name: string): string => {
    switch (name) {
      case "R12":
        return "สนับสนุนเครือข่ายกลุ่มโอกาส";
      case "R11":
        return "สนับสนุนเครือข่ายภาคประชาสังคม";
      case "R10":
        return "สนับสนุนเครือข่ายสื่อ/Influencer/นักวิชาการ";
      case "R9":
        return "สนับสนุนเครือข่ายโรงเรียน และอุดมศึกษา";
      case "R8":
        return "สร้างมวลชนฝั่งเรา";
      case "R7":
        return "สร้างสื่อ/เครือข่ายใหม่/Influencer/นักวิชาการ";
      case "R6":
        return "กิจกรรมเข้าสู่สถาณศึกษา ระดับอุดมศึกษา และสร้างเครือข่าย";
      case "R5":
        return "กิจกรรมเข้าสู่โรงเรียน และสร้างเครือข่าย";
      case "R4":
        return "IRC วันสำคัญประจำเดือน 3 มิติ";
      case "R3":
        return "เพจข่าวและสื่อมวลชนประจำจังหวัด";
      case "R2":
        return "เพจ ISOC ประจำจังหวัด";
      case "R1":
        return "ประชาสัมพันธ์ผ่านเพจ และ Influencer ของหน่วย";
      case "M1":
        return "การปฏิบัติทางไซเบอร์";
      case "M2":
        return "การปฏิบัติทางข้อมูลข่าวสาร(กลยุทธ์สร้างภาพจำ)";
      case "M3":
        return "การติดตามความเคลื่อนไหวทางกายภาพ";
      case "M4":
        return "สนับสนุนเครือข่ายฝ่ายเห็นต่าง";
      case "M5":
        return "ตอบโต้ประเด็นประจำวัน";
      case "M6":
        return "ตอบโต้ข้อมูลบิดเบือนฝ่ายเห็นต่าง(เฉพาะกรณี)";
      case "M7":
        return "จัดตั้งและสนับสนุน เครือข่ายประชาธิปไตย";
      case "M8":
        return "วิเคราะห์ข้อมูล";
      case "หัวข้อประสาน":
        return "หัวข้อประสาน";
      default:
        return "";
    }
  };

  const getColorPriority = (name: string): string => {
    console.log(name);
    
    switch (name.toLowerCase()) {
      case "ต่ำ":
      case "low":
        return "primary";
      case "ปานกลาง":
      case "medium":
        return "orange";
      case "สูง":
      case "high":
        return "red";
      default:
        return "";

    }
  };

  // const getMissionImage = (mission: string): string => {

  //   // console.log(mission);
  //   return `/logo/Icon-${mission}.png`;
    
  // };
  const getMissionImage = (mission: string): string | false => {
    if (mission.startsWith('M')) {
      return `/logo/Icon-${mission}.png`;
    } else if (mission.startsWith('R')) {
      return false;
    }

    return `/logo/Icon-${mission}.png`; // default กรณีอื่น
  };
  return {
    getTeamColor,
    getMissionColor,
    getTeamColorSoft,
    getMissionName,
    getColorPriority,
    getMissionImage
  };
};
