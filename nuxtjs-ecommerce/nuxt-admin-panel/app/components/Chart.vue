<template>
  <div ref="chartdiv" id="chartdiv" style="height: 500px"></div>
</template>

<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const props = defineProps(['data'])

const chartdiv = ref(null)
let root = null
let themeObserver = null
let disposed = false

// رنگ‌های چارت بر اساس تم فعال (دارک/لایت) — هماهنگ با توکن‌های CSS
function chartPalette() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return dark
    ? { text: 0xc8c2b0, grid: 0x28475c, tooltipBg: 0x182f40, tooltipText: 0xf2ecdd }
    : { text: 0x756a58, grid: 0xe9dcc4, tooltipBg: 0x1a2f40, tooltipText: 0xffffff };
}

// تم سفارشی: رنگ متن/گرید/تولتیپ از پالت فعلی می‌آید (canvas رندر می‌شود، CSS اثری ندارد)
function buildChartTheme(rootRef, p) {
  const theme = am5.Theme.new(rootRef);
  theme.rule("Label").setAll({
    fill: am5.color(p.text),
  });
  theme.rule("AxisLabel").setAll({
    fill: am5.color(p.text),
  });
  theme.rule("Grid").setAll({
    stroke: am5.color(p.grid),
  });
  return theme;
}

function makeRtlTooltip(rootRef, p, labelText) {
  const tooltip = am5.Tooltip.new(rootRef, labelText ? { labelText } : {});
  tooltip.label.setAll({
    direction: "rtl",
    fontFamily: "Vazir",
    fill: am5.color(p.tooltipText),
  });
  tooltip.set("background", am5.Rectangle.new(rootRef, {
    fill: am5.color(p.tooltipBg),
    fillOpacity: 0.95,
  }));
  return tooltip;
}

function buildChart() {
  if (disposed) return;

  const p = chartPalette();

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  root = am5.Root.new(chartdiv.value);

  // Set themes (تم رنگی آخر است تا بر پیش‌فرض‌ها غلبه کند)
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root),
    buildChartTheme(root, p),
  ]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
    }),
  );

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15,
    direction: "rtl",
    fontFamily: "Vazir",
  });
  let yRenderer = am5xy.AxisRendererY.new(root, {});
  yRenderer.labels.template.setAll({
    direction: "rtl",
    fontFamily: "Vazir",
  });

  let xtooltipRtl = makeRtlTooltip(root, p);  let xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "month",
      renderer: xRenderer,
      tooltip: xtooltipRtl,
    }),
  );

  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer,
    }),
  );

  let tooltipRtl = makeRtlTooltip(root, p, "{valueY}");

  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "month",
      tooltip: tooltipRtl,
    }),
  );

  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  // Set data
  const fallbackData = [
    {
      month: "فروردین",
      value: 2025,
    },
    {
      month: "اردیبهشت",
      value: 1882,
    },
    {
      month: "خرداد",
      value: 1809,
    },
    {
      month: "تیر",
      value: 1722,
    },
    {
      month: "مرداد",
      value: 1522,
    },
    {
      month: "شهریور",
      value: 1414,
    },
    {
      month: "مهر",
      value: 1120,
    },
    {
      month: "آبان",
      value: 998,
    },
    {
      month: "آذر",
      value: 875,
    },
    {
      month: "دی",
      value: 789,
    },
    {
      month: "بهمن",
      value: 658,
    },
    {
      month: "اسنفد",
      value: 598,
    },
  ];

  let data = Array.isArray(props.data) && props.data.length > 0 ? props.data : fallbackData;
  xAxis.data.setAll(data);
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
}

onMounted(() => {
  am5.ready(function () {
    buildChart();
  }); // end am5.ready()

  // هنگام toggle دارک/لایت، چارت با رنگ‌های تم جدید دوباره ساخته می‌شود
  themeObserver = new MutationObserver(() => {
    if (!root) return;
    root.dispose();
    root = null;
    buildChart();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});

onUnmounted(() => {
  disposed = true;
  themeObserver?.disconnect();
  themeObserver = null;
  root?.dispose();
  root = null;
});
</script>
