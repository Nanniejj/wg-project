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
