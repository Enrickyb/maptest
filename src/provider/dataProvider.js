import base2019 from "../data/geojson/plansab_2019_base.json";
import acelerado2028 from "../data/geojson/plansab_2028_acelerado.json";
import tendencial2028 from "../data/geojson/plansab_2028_tendencial.json";
import moderado2028 from "../data/geojson/plansab_2028_moderado.json";
import acelerado2033 from "../data/geojson/plansab_2033_acelerado.json";
import tendencial2033 from "../data/geojson/plansab_2033_tendencial.json";
import moderado2033 from "../data/geojson/plansab_2033_moderado.json";
import acelerado2043 from "../data/geojson/plansab_2043_acelerado.json";
import tendencial2043 from "../data/geojson/plansab_2043_tendencial.json";
import moderado2043 from "../data/geojson/plansab_2043_moderado.json";

export const dataProvider = {
  2019: {
    base: function () {
      return base2019;
    },
  },
  2028: {
    acelerado: function () {
      return acelerado2028;
    },
    tendencial: function () {
      return tendencial2028;
    },
    moderado: function () {
      return moderado2028;
    },
  },
  2033: {
    acelerado: function () {
      return acelerado2033;
    },
    tendencial: function () {
      return tendencial2033;
    },
    moderado: function () {
      return moderado2033;
    },
  },
  2043: {
    acelerado: function () {
      return acelerado2043;
    },
    tendencial: function () {
      return tendencial2043;
    },
    moderado: function () {
      return moderado2043;
    },
  },
};
