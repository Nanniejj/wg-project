import moment from 'moment';
import 'moment/locale/th';

export default defineNuxtPlugin(() => {
//   moment.locale('th');
  return {
    provide: {
      moment,
    },
  };
});
