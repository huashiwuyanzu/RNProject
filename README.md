# Git操作指南：
+ 查看本地的账号信息：git config user.name
+ 查看本地的邮箱信息：git config user.email
+ 全局配置用户名和邮箱：git config --global user.name "your name"
+ 添加功能：feature: xxx
+ 修复bug：fix: xxx
+ 样式调整：style: xxx
<br/>
<br/>
<br/>


# 项目各个模块
## storage 模块（本地数据库管理）
📦 职责：
+ 统一封装本地数据操作（可选 AsyncStorage or react-native-mmkv）
+ 结构清晰的数据 schema，如 tasks.json, habits.json, settings.json

📚 技术点：
+ 本地缓存封装策略（持久化单元设计）
+ 轻量数据库选型：AsyncStorage / SQLite / MMKV
+ 提供统一的 getData / setData 接口
<br/>
<br/>
 
## auth 模块（本地身份管理）
📦 职责：
+ 匿名身份识别（如首次进入自动生成 userId）
+ 记录首次启动状态
+ 存储基础用户偏好（如主题、语言）

📚 技术点：
+ UUID 生成与存储
+ AppState 检测是否首次启动
+ 多端数据隔离（用户 ID 为键名）
<br/>
<br/>
 


## tasks 模块（本地任务管理）
📦 职责：
+ 任务的增删改查、状态切换（待办/完成）
+ 标签分类、时间筛选、本地排序

📚 技术点：
+ FlatList + 动态 UI
+ 自定义任务卡片组件
+ 模态框表单 + 表单验证
+ 状态管理（zustand / context）
<br/>
<br/>


## pomodoro 模块（离线倒计时）
📦 职责：
+ 倒计时逻辑管理（番茄钟 25+5）
+ 本地通知推送（即使离开 App）
+ 番茄钟记录归档
  
📚 技术点：
+ useRef 控制计时器精度
+ react-native-push-notification 本地提醒
+ 应用前后台状态切换（AppState）
+ 振动反馈、音效播放（本地 mp3）
<br/>
<br/>
  

## habits 模块（日历打卡）
📦 职责：
+ 创建/编辑习惯
+ 每天打卡 + 日历展示
+ 连续打卡天数统计

📚 技术点：
+ react-native-calendars 日历组件
+ 每日标记 UI 高亮
+ 连续天数判断逻辑（与日期匹配）
<br/>
<br/>


## analytics 模块（离线图表）
📦 职责：
+ 本地完成率、打卡趋势图
+ 饼图/柱状图展示数据

📚 技术点：
+ victory-native + react-native-svg 图表组件
+ 本地数据整合、日期聚合算法
+ 图表交互（点击查看数据）
<br/>
<br/>


## settings 模块（用户偏好设置）
📦 职责：
+ 主题（暗黑/浅色）
+ 清空数据（初始化 App）
+ 通知权限设置

📚 技术点：
+ Appearance API 动态主题
+ 权限请求（通知权限、震动权限）
+ Alert + 交互式确认操作
<br/>
<br/>


## shared 模块（复用组件 & 工具）
📦 职责：
+ 公共组件：按钮、输入框、标签、分割线等
+ 公共 hooks：useTheme, useLocalData, useTimer
+ 公共工具函数：日期格式化、UUID、数据聚合等
<br/>
<br/>


# 待解决的问题：
+ tabBar中的icon引入失败
+ list页面中的东西太丑了
+ list的数据量如果庞大，要如何解决？