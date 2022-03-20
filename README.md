# Inf 

Inf - результат (цель) моего индивидуального итогового школьного проекта по созданию сайта для подготовки к ЕГЭ по информатике, хотя может использоваться в других целях. Этот проект является фронтендом и ему требуется [бекенд](https://github.com/HeroBrine1st/InfApi).

Крайне разочарован тем, что по большей части я защитил не этот проект, на который было потрачено огромное количество времени (и на [грабли](https://ru.wiktionary.org/wiki/%D0%BD%D0%B0%D1%81%D1%82%D1%83%D0%BF%D0%B0%D1%82%D1%8C_%D0%BD%D0%B0_%D0%B3%D1%80%D0%B0%D0%B1%D0%BB%D0%B8) тоже), а идею, которую мы придумали за два дня, но.. Я получил неплохой опыт. Это моё первое React-приложение и в принципе мой первый опыт на фронтенде, так что я благодарен Российской системе образования за то, что в итоге привела меня к этому проекту и расширению моих навыков как следствию из него.  
Код может быть совершенно непонятным, может быть нарушено огромное количество конвенций и создано огромное количество велосипедов (как я не узнал про SWR в процессе многочасового гуглинга?), однако это мой первый опыт на фронтенде и я его оставляю в таком виде.

# Планы
Скорее всего не будут исполнены в этом проекте, поскольку я потерял к нему интерес и результат не будет принят моей школой из-за необходимости настройки и учителями из-за необходимости изучения

### Преобразовать в платформу с домашними заданиями, которые будут создавать учителя для учеников
* [ ] Сделать возможность создания вариантов для домашних заданий (для удалённого обучения)
  * [ ] Сделать разделение на предметы
  * [ ] Сделать поддержку нескольких аккаунтов (для учителей и учеников)
  * [ ] Сделать возможность отправки ответов

### Улучшить панель управления
* [ ] Применить [rich-markdown-editor](https://github.com/outline/rich-markdown-editor) в редакторе заданий
* [ ] Изменить дизайн

# Фичи

* Всякие анимашки
* PWA
  * Архитектурная возможность скачать задания локально (нужна правка исходного кода service-worker'а)
* Панель управления для заполнения сайта
* Иерархия сущностей: темы->подтемы->задания<-варианты
* Поддержка Markdown в заданиях и ответах/решениях на них (на данный момент есть только ответы и это решается изменением строки в исходном коде на "решение")
* Адаптивный дизайн под мобильные устройства

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
