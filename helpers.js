const sortIcons = (array) => {
  if (array.length === 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};

const sortFiveDayForecast = (res) => {
  const fiveDay = [];
  const date = new Date();
  let day = date.getDay();
  for (let i = 0; i < res.length; i += 8) {
    const lowArr = [];
    const highArr = [];
    const iconArr = [];
    ++day;
    if (day === 7) {
      day = 0;
    }
    for (let j = 0; j < 8; j++) {
      lowArr.push(res[i + j].main.temp_min);
      highArr.push(res[i + j].main.temp_max);
      iconArr.push(res[i + j].weather[0].main);

      if (j === 7) {
        const low = Math.min(...lowArr);
        const high = Math.max(...highArr);
        const icon = this.sortIcons(iconArr);
        const newWeatherObject = {
          low: low,
          high: high,
          day: day,
          icon: icon,
        };
        fiveDay.push(newWeatherObject);
      }
    }
  }

  return fiveDay;
};

module.exports.sortFiveDayForecast = sortFiveDayForecast;
module.exports.sortIcons = sortIcons;
