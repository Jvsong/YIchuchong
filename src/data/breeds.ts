import type { Breed } from "./types";

const rows = [
  ["golden-retriever", "金毛寻回犬", "Golden Retriever", "dog", "中大型", "友善稳定", "中等", "高", "适合家庭陪伴，需要规律运动和毛发护理。", "亲子家庭、有固定遛狗时间的主人", "60-90分钟", "控制零食，注意体重和关节负担。", "髋关节、皮肤和肥胖风险。", "定位器 + 活动报告适合记录户外运动。", "/assets/pets/breeds/dogs/golden-retriever.jpg", "亲人,户外,家庭"],
  ["corgi", "柯基", "Corgi", "dog", "中型", "活泼亲人", "中等", "中高", "短腿但精力充沛，注意体重和腰椎压力。", "城市家庭、喜欢互动训练的主人", "45-70分钟", "避免过胖，少爬高台阶。", "腰椎、肥胖和关节压力。", "定位器记录路线，活动报告避免过量。", "/assets/pets/breeds/dogs/corgi.jpg", "城市,活泼,控重"],
  ["shiba", "柴犬", "Shiba Inu", "dog", "中型", "独立警觉", "中等", "中", "性格有主见，训练需要稳定边界和正向反馈。", "有训练耐心、重视牵引安全的主人", "45-75分钟", "保持稳定饮食，不频繁换粮。", "皮肤敏感、走失风险。", "定位器和电子围栏优先推荐。", "/assets/pets/breeds/dogs/shiba.jpg", "独立,牵引,城市"],
  ["border-collie", "边境牧羊犬", "Border Collie", "dog", "中型", "聪明敏捷", "较高", "高", "学习能力强，需要脑力游戏和充足户外活动。", "有训练经验、能提供高互动的主人", "90-120分钟", "高活动量下关注补水和能量。", "焦虑、过度兴奋和关节负担。", "定位器 + 城市探索任务适合消耗精力。", "/assets/pets/breeds/dogs/border-collie.jpg", "高能,训练,探索"],
  ["poodle", "贵宾犬", "Poodle", "dog", "小型/中型", "聪明亲近", "中等", "中", "适合城市家庭，毛发需要定期修剪。", "公寓家庭、希望互动训练的主人", "35-60分钟", "小型犬注意牙齿和零食控制。", "牙齿、泪痕和皮肤护理。", "活动报告 + 养宠建议适合建立节奏。", "/assets/pets/breeds/dogs/poodle.jpg", "城市,聪明,美容"],
  ["labrador", "拉布拉多", "Labrador Retriever", "dog", "中大型", "开朗可靠", "中等", "高", "食欲旺盛，需要管理体重并保持运动。", "家庭陪伴、户外活动较多的主人", "70-100分钟", "分餐控量，避免过量零食。", "肥胖、关节和耳部问题。", "定位器 + 活动报告帮助控重。", "/assets/pets/breeds/dogs/labrador.jpg", "家庭,运动,控重"],
  ["samoyed", "萨摩耶", "Samoyed", "dog", "中大型", "热情温和", "较高", "高", "毛量丰厚，夏季要避暑并注意梳毛。", "有护理时间、居住环境通风的家庭", "60-90分钟", "夏季降低运动强度，关注补水。", "中暑、皮肤和毛发打结。", "定位器低电提醒 + 天气建议很实用。", "/assets/pets/breeds/dogs/samoyed.jpg", "毛发,避暑,户外"],
  ["beagle", "比格犬", "Beagle", "dog", "中型", "好奇外向", "中等", "中高", "嗅觉驱动强，外出建议全程牵引。", "能接受牵引训练的活跃家庭", "60-90分钟", "注意偷吃和体重。", "走失、肥胖和耳部问题。", "定位器和电子围栏优先。", "/assets/pets/breeds/dogs/beagle.jpg", "嗅闻,走失预防,牵引"],
  ["french-bulldog", "法国斗牛犬", "French Bulldog", "dog", "中小型", "安静粘人", "中等", "低中", "短鼻犬要避免高温剧烈运动。", "城市公寓、短时多次活动的主人", "20-40分钟", "避免高温，控制体重。", "呼吸、皮肤和脊椎问题。", "天气提醒 + 活动报告避免过量。", "/assets/pets/breeds/dogs/french-bulldog.jpg", "短鼻犬,公寓,低强度"],
  ["husky", "哈士奇", "Siberian Husky", "dog", "中大型", "外向精力旺", "较高", "高", "需要大量运动和防走失管理。", "有户外时间、能稳定牵引的主人", "90-120分钟", "运动后补水，避免炎热天气。", "走失、肠胃和热应激。", "定位器、电子围栏和路线复盘必备。", "/assets/pets/breeds/dogs/husky.jpg", "高能,防走失,户外"],
  ["german-shepherd", "德牧", "German Shepherd", "dog", "大型", "警觉忠诚", "较高", "高", "需要稳定训练和明确任务感。", "有训练经验、重视安全边界的主人", "80-110分钟", "运动与训练结合，关注关节。", "髋肘关节、焦虑和皮肤。", "定位器 + 家庭共享适合多人管理。", "/assets/pets/breeds/dogs/german-shepherd.jpg", "训练,守护,大型犬"],
  ["bichon", "比熊", "Bichon Frise", "dog", "小型", "亲人活泼", "中等", "中", "适合城市陪伴，毛发护理较重要。", "公寓家庭、愿意定期美容的主人", "30-50分钟", "少盐少油，关注泪痕。", "泪痕、皮肤和牙齿问题。", "护理提醒和日常任务更合适。", "/assets/pets/breeds/dogs/bichon.jpg", "小型,陪伴,美容"],
  ["akita", "秋田犬", "Akita", "dog", "大型", "稳重独立", "较高", "中", "需要早期社会化和稳定牵引。", "有大型犬经验的主人", "60-90分钟", "均衡饮食，避免过胖。", "关节、皮肤和牵引风险。", "定位器 + 电子围栏提升外出安全。", "/assets/pets/breeds/dogs/akita.jpg", "大型,独立,牵引"],
  ["mini-schnauzer", "雪纳瑞", "Miniature Schnauzer", "dog", "小型", "机警活跃", "中等", "中", "互动需求高，适合规律训练。", "城市家庭、喜欢训练的主人", "40-60分钟", "低脂饮食，关注胰腺风险。", "胰腺、皮肤和牙齿问题。", "活动报告 + 健康提醒适用。", "/assets/pets/breeds/dogs/mini-schnauzer.jpg", "小型,训练,健康"],
  ["alaskan-malamute", "阿拉斯加", "Alaskan Malamute", "dog", "大型", "温和有力量", "较高", "高", "体型大、毛量高，需要空间和避暑。", "有空间和护理时间的家庭", "80-120分钟", "控制体重，夏季调整运动。", "热应激、关节和皮肤。", "定位器 + 天气安全提醒推荐。", "/assets/pets/breeds/dogs/alaskan-malamute.jpg", "大型,毛发,避暑"],
  ["yorkshire-terrier", "约克夏", "Yorkshire Terrier", "dog", "小型", "机灵粘人", "中等", "中", "体型小但存在感强，适合室内陪伴和短时外出。", "公寓家庭、愿意梳毛的主人", "25-45分钟", "少量多餐，注意牙齿清洁。", "牙齿、气管和髌骨问题。", "活动报告 + 护理提醒适合小型犬节奏。", "/assets/pets/breeds/dogs/yorkshire-terrier.jpg", "小型,陪伴,美容"],
  ["pomeranian", "博美", "Pomeranian", "dog", "小型", "活泼警觉", "中等", "中", "外向爱叫，日常要做安静训练和毛发护理。", "城市家庭、能耐心引导吠叫的主人", "25-45分钟", "控制零食，避免体重上升。", "气管、牙齿和髌骨问题。", "任务提醒训练，活动报告避免过量。", "/assets/pets/breeds/dogs/pomeranian.jpg", "小型,警觉,控重"],
  ["chihuahua", "吉娃娃", "Chihuahua", "dog", "小型", "敏感勇敢", "中等", "低中", "怕冷且容易紧张，外出要注意保暖和安全距离。", "安静家庭、有耐心的新手主人", "20-35分钟", "少量喂食，避免低血糖和过胖。", "牙齿、低血糖和髌骨问题。", "监控器 + 活动报告适合观察日常状态。", "/assets/pets/breeds/dogs/chihuahua.jpg", "小型,保暖,陪伴"],
  ["dachshund", "腊肠犬", "Dachshund", "dog", "小型/中型", "好奇固执", "中等", "中", "身体长、腿短，日常要减少跳上跳下。", "能管理台阶和体重的家庭", "35-55分钟", "严格控重，避免频繁爬楼。", "椎间盘、肥胖和牙齿问题。", "活动报告 + 家庭提醒可帮助控制运动强度。", "/assets/pets/breeds/dogs/dachshund.jpg", "短腿,控重,腰椎"],
  ["australian-shepherd", "澳洲牧羊犬", "Australian Shepherd", "dog", "中型", "聪明高能", "较高", "高", "需要任务感和大量互动，单纯散步通常不够。", "有训练时间、喜欢户外活动的主人", "90-120分钟", "运动日注意补水和能量补充。", "焦虑、髋关节和眼部问题。", "定位器 + 探索任务适合记录高强度活动。", "/assets/pets/breeds/dogs/australian-shepherd.jpg", "高能,训练,户外"],
  ["british-shorthair", "英短", "British Shorthair", "cat", "中型", "安静稳重", "中等", "中", "圆润亲人，注意体重控制和日常梳毛。", "室内陪伴、节奏稳定的家庭", "20-30分钟", "控制热量，增加互动玩耍。", "肥胖、泌尿和心肌风险。", "智能饮水机 + 监控器适合观察状态。", "/assets/pets/breeds/cats/british-shorthair.jpg", "室内,控重,安静"],
  ["ragdoll", "布偶猫", "Ragdoll", "cat", "大型", "温顺亲近", "中等", "低中", "毛发较长，需要规律梳理和环境稳定。", "陪伴时间多、能护理长毛的家庭", "15-25分钟", "注意毛球和饮水。", "心肌、毛球和肠胃。", "智能饮水机 + 监控器推荐。", "/assets/pets/breeds/cats/ragdoll.jpg", "长毛,温顺,陪伴"],
  ["maine-coon", "缅因猫", "Maine Coon", "cat", "大型", "温和大方", "较高", "中", "体型较大，需要更宽敞活动空间。", "空间较大、能提供爬架的家庭", "20-35分钟", "关注大体型营养和毛发。", "心肌、关节和毛发护理。", "监控器 + 活动报告适合观察活动。", "/assets/pets/breeds/cats/maine-coon.jpg", "大型猫,长毛,空间"],
  ["orange-cat", "橘猫", "Orange Cat", "cat", "中型", "亲人贪吃", "较低", "中", "饮食管理是重点，适合建立喂养记录。", "愿意控制饮食的家庭", "20-30分钟", "分餐控量，减少零食。", "肥胖、糖尿病和泌尿。", "自动出粮机 + 饮水机适合控量。", "/assets/pets/breeds/cats/orange-cat.jpg", "控重,喂养,亲人"],
  ["siamese", "暹罗猫", "Siamese", "cat", "中型", "聪明爱交流", "中等", "中高", "互动需求高，适合陪伴时间较多的家庭。", "喜欢互动、能陪玩的主人", "25-40分钟", "保持高质量蛋白和互动节奏。", "焦虑、呼吸和牙齿问题。", "监控器 + 互动任务推荐。", "/assets/pets/breeds/cats/siamese.jpg", "聪明,互动,陪伴"],
  ["american-shorthair", "美短", "American Shorthair", "cat", "中型", "活泼适应强", "较低", "中", "适应能力好，日常注意运动和牙齿护理。", "新手养猫家庭", "20-35分钟", "保持运动，避免过胖。", "肥胖、牙齿和泌尿。", "智能饮水机 + 活动任务适合。", "/assets/pets/breeds/cats/american-shorthair.jpg", "新手,活泼,室内"],
  ["persian", "波斯猫", "Persian", "cat", "中型", "安静优雅", "较高", "低", "脸部清洁和毛发护理要求较高。", "有护理耐心、环境稳定的家庭", "15-25分钟", "关注泪痕、毛球和饮水。", "呼吸、泪痕和毛球。", "监控器 + 护理提醒更实用。", "/assets/pets/breeds/cats/persian.jpg", "长毛,护理,安静"],
  ["sphynx", "无毛猫", "Sphynx", "cat", "中型", "亲人敏感", "较高", "中", "皮肤清洁和保暖需要特别关注。", "有护理经验、室温稳定的家庭", "20-30分钟", "注意保暖和皮肤清洁。", "皮肤、温度敏感和肠胃。", "智能监控器用于观察室温与状态。", "/assets/pets/breeds/cats/sphynx.jpg", "敏感,保暖,护理"],
  ["norwegian-forest", "挪威森林猫", "Norwegian Forest Cat", "cat", "大型", "独立温和", "较高", "中", "长毛且体型较大，需要空间和梳理。", "空间较大、能定期梳毛的家庭", "20-35分钟", "关注毛球和体重。", "毛球、心肌和关节。", "监控器 + 饮水机适合日常观察。", "/assets/pets/breeds/cats/norwegian-forest.jpg", "长毛,大型,独立"],
  ["devon-rex", "德文卷毛猫", "Devon Rex", "cat", "小型", "活泼粘人", "中等", "中高", "需要互动和保暖，适合陪伴型家庭。", "陪伴时间较多的主人", "25-40分钟", "少量多餐，注意保暖。", "皮肤、耳道和温度敏感。", "互动任务 + 监控器推荐。", "/assets/pets/breeds/cats/devon-rex.jpg", "活泼,粘人,互动"],
  ["bengal", "孟加拉豹猫", "Bengal", "cat", "中型", "精力旺盛", "中等", "高", "需要大量室内活动和环境丰容。", "能提供攀爬和互动空间的主人", "30-50分钟", "高蛋白饮食，避免无聊进食。", "焦虑、肠胃和活动不足。", "养宠建议任务 + 活动报告适合。", "/assets/pets/breeds/cats/bengal.jpg", "高能,互动,丰容"],
  ["scottish-fold", "折耳猫", "Scottish Fold", "cat", "中型", "安静亲人", "较高", "低中", "需特别关注关节，不建议过度跳跃。", "愿意做健康观察的家庭", "10-20分钟", "控制体重，减少关节压力。", "骨软骨发育、关节疼痛。", "监控器 + 健康提醒用于观察行动变化。", "/assets/pets/breeds/cats/scottish-fold.jpg", "关节,安静,健康"],
  ["russian-blue", "俄罗斯蓝猫", "Russian Blue", "cat", "中型", "安静谨慎", "中等", "中", "喜欢稳定环境，熟悉后会很亲近。", "作息规律、家里较安静的主人", "20-30分钟", "控制热量，保持饮水充足。", "肥胖、泌尿和牙齿问题。", "智能饮水机 + 监控器适合日常观察。", "/assets/pets/breeds/cats/russian-blue.jpg", "安静,室内,稳定"],
  ["exotic-shorthair", "异国短毛猫", "Exotic Shorthair", "cat", "中型", "温顺安静", "中等", "低中", "短毛版波斯感，脸部清洁仍然重要。", "喜欢安静陪伴、能做日常清洁的家庭", "15-25分钟", "关注泪痕和体重，少喂零食。", "泪痕、呼吸和肥胖问题。", "护理提醒 + 监控器更实用。", "/assets/pets/breeds/cats/exotic-shorthair.jpg", "短鼻,安静,护理"],
  ["abyssinian", "阿比西尼亚猫", "Abyssinian", "cat", "中型", "活泼好奇", "中等", "高", "喜欢攀爬和探索，需要丰富的室内活动。", "能提供猫爬架和互动时间的主人", "30-45分钟", "保持高蛋白饮食，避免无聊进食。", "牙齿、肠胃和压力问题。", "互动任务 + 活动报告适合消耗精力。", "/assets/pets/breeds/cats/abyssinian.jpg", "高能,探索,互动"],
  ["burmese", "缅甸猫", "Burmese", "cat", "中型", "亲人外向", "中等", "中高", "很爱参与家庭生活，长时间独处容易无聊。", "陪伴时间多、喜欢互动的家庭", "25-40分钟", "按体况控量，避免越养越圆。", "肥胖、牙齿和糖尿病风险。", "监控器 + 自动出粮机适合管理独处和喂食。", "/assets/pets/breeds/cats/burmese.jpg", "亲人,互动,控重"],
  ["oriental-shorthair", "东方短毛猫", "Oriental Shorthair", "cat", "中型", "爱说话粘人", "中等", "中高", "表达欲强，适合能回应互动的家庭。", "愿意陪玩、能接受猫咪话多的主人", "25-40分钟", "规律喂食，关注压力下食欲变化。", "牙齿、焦虑和呼吸问题。", "互动任务 + 监控器适合观察情绪。", "/assets/pets/breeds/cats/oriental-shorthair.jpg", "话多,粘人,互动"],
  ["birman", "伯曼猫", "Birman", "cat", "中型/大型", "温柔亲近", "中等", "中", "长毛但性格稳定，适合家庭陪伴。", "愿意梳毛、希望温和猫咪的家庭", "20-30分钟", "注意毛球，保证饮水和纤维摄入。", "毛球、心肌和泌尿问题。", "智能饮水机 + 护理提醒推荐。", "/assets/pets/breeds/cats/birman.jpg", "长毛,温柔,家庭"],
  ["munchkin", "曼基康猫", "Munchkin Cat", "cat", "小型", "活泼亲人", "中等", "中", "短腿但好奇好动，居家需要防滑地面和容易到达的活动设施。", "空间不大、愿意陪伴并关注关节状态的家庭", "20-30分钟", "按体况定量喂食，避免超重增加四肢负担。", "关节、脊柱和肥胖风险。", "监控器 + 活动报告适合观察跳跃与行动变化。", "/assets/pets/breeds/cats/munchkin.jpg", "短腿,室内,关节"],
  ["turkish-angora", "土耳其安哥拉猫", "Turkish Angora", "cat", "中型", "优雅好动", "中等", "中高", "爱攀爬也爱亲近，长毛需要定期梳理。", "能提供高处空间和梳毛时间的主人", "25-40分钟", "注意毛球和饮水，避免过胖。", "毛球、耳部和心肌问题。", "监控器 + 饮水机适合室内管理。", "/assets/pets/breeds/cats/turkish-angora.jpg", "长毛,攀爬,互动"],
  ["rabbit", "兔子", "Rabbit", "small-pet", "小型", "安静敏感", "中等", "中", "需要干草、磨牙和安静空间。", "能提供固定笼舍和活动区的家庭", "30-60分钟室内活动", "干草为主，控制零食。", "牙齿、肠胃停滞和惊吓。", "监控器适合观察进食和活动。", "/assets/pets/breeds/small-pets/rabbit.jpg", "小宠,干草,安静"],
  ["hamster", "仓鼠", "Hamster", "small-pet", "小型", "夜行好奇", "中等", "中", "笼舍、跑轮和温度稳定很重要。", "空间有限但能夜间安静照护的主人", "夜间跑轮活动", "专用粮 + 少量蔬果。", "温度、湿尾和逃逸。", "监控器可观察夜间活动。", "/assets/pets/breeds/small-pets/hamster.jpg", "夜行,笼舍,小宠"],
  ["guinea-pig", "豚鼠", "Guinea Pig", "small-pet", "小型", "温和群居", "中等", "低中", "需要维 C、干草和同伴社交。", "能稳定清洁笼舍的家庭", "每日地面活动20-40分钟", "补充维 C，干草充足。", "维 C 缺乏、牙齿和呼吸道。", "安全档案记录饮食和体重更适合。", "/assets/pets/breeds/small-pets/guinea-pig.jpg", "群居,维C,小宠"],
  ["chinchilla", "龙猫", "Chinchilla", "small-pet", "小型", "敏感活泼", "较高", "中", "怕热，需要浴沙和稳定环境。", "能控制室温和湿度的主人", "夜间活动为主", "专用粮、干草，避免高糖。", "中暑、牙齿和肠胃。", "监控器和温度提醒适合。", "/assets/pets/breeds/small-pets/chinchilla.jpg", "怕热,夜行,小宠"],
  ["parrot", "鹦鹉", "Parrot", "small-pet", "小型/中型", "聪明爱互动", "较高", "中高", "需要陪伴、玩具和安全飞行空间。", "有互动时间、能安全放飞的家庭", "每日互动30-60分钟", "谷物、蔬果和专用粮均衡。", "啄羽、无聊和呼吸道。", "监控器可辅助观察独处状态。", "/assets/pets/breeds/small-pets/parrot.jpg", "聪明,互动,飞行"],
  ["ferret", "雪貂", "Ferret", "small-pet", "小型", "好奇活跃", "较高", "高", "需要防逃逸环境和丰富互动。", "有小宠经验、能管理环境的主人", "每日活动1-2小时", "高蛋白饮食，避免随意零食。", "逃逸、肠胃和误食。", "定位标签和监控器未来可联动。", "/assets/pets/breeds/small-pets/ferret.jpg", "高能,防逃逸,小宠"],
  ["tortoise", "陆龟", "Tortoise", "small-pet", "小型", "安静规律", "较高", "低", "需要温湿度、光照和长期照护计划。", "愿意长期维护环境的主人", "每日晒背和缓慢活动", "高纤维植物性食物。", "温湿度、甲壳和营养失衡。", "安全档案记录环境参数更适合。", "/assets/pets/breeds/small-pets/tortoise.jpg", "温控,长期,小宠"],
  ["hedgehog", "刺猬", "Hedgehog", "small-pet", "小型", "胆小夜行", "中等", "中", "需要温暖、安静和循序渐进互动。", "能接受夜行习惯的主人", "夜间跑轮活动", "昆虫蛋白和专用粮搭配。", "温度、肥胖和皮肤。", "监控器适合夜间观察。", "/assets/pets/breeds/small-pets/hedgehog.jpg", "夜行,温控,小宠"]
] as const;

/** 各品种自由文本字段的英文翻译，按 slug 索引。
 *  顺序：temperament, summary, suitablePeople, dailyExercise, feedingTips, healthRisks, deviceSuggestion */
const en: Record<string, [string, string, string, string, string, string, string]> = {
  "golden-retriever": ["Friendly and steady", "Great family companion; needs regular exercise and coat care.", "Families with kids and a fixed walking routine", "60-90 min", "Limit treats; watch weight and joint load.", "Hip, skin and obesity risks.", "Tracker + activity report suit logging outdoor exercise."],
  corgi: ["Lively and affectionate", "Short legs but full of energy; watch weight and spine pressure.", "Urban families who enjoy interactive training", "45-70 min", "Avoid excess weight; limit stair climbing.", "Spine, obesity and joint pressure.", "Tracker logs routes; activity report avoids overdoing it."],
  shiba: ["Independent and alert", "Opinionated; training needs firm boundaries and positive feedback.", "Owners with patience who value leash safety", "45-75 min", "Keep a stable diet; avoid frequent food changes.", "Sensitive skin, loss risk.", "Tracker and geo-fence are top picks."],
  "border-collie": ["Smart and agile", "Strong learner; needs mental games and plenty of outdoor activity.", "Experienced owners who can give high interaction", "90-120 min", "Watch hydration and energy under high activity.", "Anxiety, over-excitement and joint load.", "Tracker + city-exploration tasks help burn energy."],
  poodle: ["Smart and close", "Great for urban families; coat needs regular trimming.", "Apartment families who like interactive training", "35-60 min", "Small dogs: watch teeth and treat control.", "Teeth, tear stains and skin care.", "Activity report + care advice help build a rhythm."],
  labrador: ["Cheerful and reliable", "Big appetite; needs weight management and exercise.", "Families with companionship and plenty of outdoor time", "70-100 min", "Portion meals; avoid excess treats.", "Obesity, joint and ear issues.", "Tracker + activity report help with weight control."],
  samoyed: ["Warm and gentle", "Thick coat; needs heat avoidance and brushing in summer.", "Families with grooming time and good ventilation", "60-90 min", "Lower exercise intensity in summer; watch hydration.", "Heatstroke, skin and coat matting.", "Tracker low-battery alert + weather advice are handy."],
  beagle: ["Curious and outgoing", "Scent-driven; keep on leash throughout outings.", "Active families open to leash training", "60-90 min", "Watch food stealing and weight.", "Loss, obesity and ear issues.", "Tracker and geo-fence come first."],
  "french-bulldog": ["Quiet and clingy", "A flat-faced breed; avoid intense exercise in heat.", "Urban apartments with short, frequent activity", "20-40 min", "Avoid heat; control weight.", "Breathing, skin and spine issues.", "Weather alerts + activity report avoid overexertion."],
  husky: ["Outgoing and energetic", "Needs lots of exercise and loss-prevention management.", "Owners with outdoor time and steady leash control", "90-120 min", "Hydrate after exercise; avoid hot weather.", "Loss, GI and heat stress.", "Tracker, geo-fence and route review are essential."],
  "german-shepherd": ["Alert and loyal", "Needs steady training and a clear sense of task.", "Experienced owners who value safe boundaries", "80-110 min", "Combine exercise with training; watch joints.", "Hip/elbow joints, anxiety and skin.", "Tracker + family sharing suit multi-person management."],
  bichon: ["Affectionate and lively", "Good urban companion; coat care matters.", "Apartment families willing to groom regularly", "30-50 min", "Low salt and oil; watch tear stains.", "Tear stains, skin and teeth issues.", "Care reminders and daily tasks fit better."],
  akita: ["Steady and independent", "Needs early socialization and steady leash control.", "Owners experienced with large breeds", "60-90 min", "Balanced diet; avoid excess weight.", "Joints, skin and leash risk.", "Tracker + geo-fence boost outing safety."],
  "mini-schnauzer": ["Alert and active", "High interaction needs; suits regular training.", "Urban families who enjoy training", "40-60 min", "Low-fat diet; watch pancreatic risk.", "Pancreas, skin and teeth issues.", "Activity report + health reminders apply."],
  "alaskan-malamute": ["Gentle and powerful", "Large with a heavy coat; needs space and heat avoidance.", "Families with space and grooming time", "80-120 min", "Control weight; adjust exercise in summer.", "Heat stress, joints and skin.", "Tracker + weather safety alerts recommended."],
  "yorkshire-terrier": ["Clever and clingy", "Small but full of presence; suits indoor company and short outings.", "Apartment families willing to brush", "25-45 min", "Small frequent meals; mind dental cleaning.", "Teeth, trachea and patella issues.", "Activity report + care reminders fit a small dog's rhythm."],
  pomeranian: ["Lively and alert", "Outgoing and vocal; needs quiet training and coat care.", "Urban families patient with barking", "25-45 min", "Control treats; avoid weight gain.", "Trachea, teeth and patella issues.", "Task-reminder training; activity report avoids overdoing it."],
  chihuahua: ["Sensitive and brave", "Cold-averse and easily nervous; keep warm and keep safe distance outside.", "Quiet families and patient first-time owners", "20-35 min", "Small portions; avoid hypoglycemia and obesity.", "Teeth, hypoglycemia and patella issues.", "Camera + activity report suit watching daily state."],
  dachshund: ["Curious and stubborn", "Long body, short legs; reduce jumping up and down.", "Families who can manage stairs and weight", "35-55 min", "Strict weight control; avoid frequent stairs.", "Disc, obesity and teeth issues.", "Activity report + family reminders help limit intensity."],
  "australian-shepherd": ["Smart and high-energy", "Needs a sense of task and lots of interaction; plain walks usually aren't enough.", "Owners with training time who love the outdoors", "90-120 min", "Watch hydration and energy on exercise days.", "Anxiety, hips and eye issues.", "Tracker + exploration tasks log high-intensity activity."],
  "british-shorthair": ["Quiet and steady", "Round and friendly; watch weight and brush regularly.", "Indoor companionship, steady-routine families", "20-30 min", "Control calories; add interactive play.", "Obesity, urinary and cardiac risks.", "Smart fountain + camera suit watching state."],
  ragdoll: ["Docile and close", "Longer coat; needs regular grooming and a stable environment.", "Families with time and long-coat care skills", "15-25 min", "Watch hairballs and hydration.", "Cardiac, hairballs and GI.", "Smart fountain + camera recommended."],
  "maine-coon": ["Gentle and generous", "Larger build; needs more roomy activity space.", "Families with space and a cat tree", "20-35 min", "Mind big-cat nutrition and coat.", "Cardiac, joints and coat care.", "Camera + activity report suit watching activity."],
  "orange-cat": ["Affectionate and greedy", "Diet management is key; good for building a feeding log.", "Families willing to control diet", "20-30 min", "Portion meals; cut treats.", "Obesity, diabetes and urinary.", "Auto feeder + fountain suit portion control."],
  siamese: ["Smart and talkative", "High interaction needs; suits families with lots of company time.", "Owners who enjoy interaction and play", "25-40 min", "Keep high-quality protein and an interactive rhythm.", "Anxiety, breathing and teeth issues.", "Camera + interactive tasks recommended."],
  "american-shorthair": ["Lively and adaptable", "Adapts well; watch exercise and dental care daily.", "First-time cat families", "20-35 min", "Keep active; avoid excess weight.", "Obesity, teeth and urinary.", "Smart fountain + activity tasks fit well."],
  persian: ["Quiet and elegant", "High demands for face cleaning and coat care.", "Patient, stable-environment families", "15-25 min", "Watch tear stains, hairballs and hydration.", "Breathing, tear stains and hairballs.", "Camera + care reminders are more practical."],
  sphynx: ["Affectionate and sensitive", "Skin cleaning and warmth need special attention.", "Families with care experience and stable room temp", "20-30 min", "Mind warmth and skin cleaning.", "Skin, temperature sensitivity and GI.", "Smart camera to watch room temperature and state."],
  "norwegian-forest": ["Independent and gentle", "Long-coated and large; needs space and grooming.", "Families with space who brush regularly", "20-35 min", "Watch hairballs and weight.", "Hairballs, cardiac and joints.", "Camera + fountain suit daily observation."],
  "devon-rex": ["Lively and clingy", "Needs interaction and warmth; suits companion-style families.", "Owners with plenty of company time", "25-40 min", "Small frequent meals; mind warmth.", "Skin, ear canal and temperature sensitivity.", "Interactive tasks + camera recommended."],
  bengal: ["Energetic", "Needs lots of indoor activity and environmental enrichment.", "Owners who can provide climbing and play space", "30-50 min", "High-protein diet; avoid boredom eating.", "Anxiety, GI and inactivity.", "Care-advice tasks + activity report suit it."],
  "scottish-fold": ["Quiet and close", "Needs special joint attention; avoid excessive jumping.", "Families willing to do health checks", "10-20 min", "Control weight; reduce joint pressure.", "Osteochondrodysplasia, joint pain.", "Camera + health reminders to watch movement changes."],
  "russian-blue": ["Quiet and cautious", "Likes a stable environment; very close once familiar.", "Owners with regular routines and a quiet home", "20-30 min", "Control calories; keep hydration ample.", "Obesity, urinary and teeth issues.", "Smart fountain + camera suit daily observation."],
  "exotic-shorthair": ["Docile and quiet", "A short-haired Persian feel; face cleaning still matters.", "Families who like quiet company and do daily cleaning", "15-25 min", "Watch tear stains and weight; few treats.", "Tear stains, breathing and obesity.", "Care reminders + camera are more practical."],
  abyssinian: ["Lively and curious", "Loves climbing and exploring; needs rich indoor activity.", "Owners who can provide a cat tree and play time", "30-45 min", "Keep high-protein diet; avoid boredom eating.", "Teeth, GI and stress issues.", "Interactive tasks + activity report help burn energy."],
  burmese: ["Affectionate and outgoing", "Loves joining family life; bored when alone for long.", "Families with plenty of company time who enjoy interaction", "25-40 min", "Portion by condition; avoid getting rounder.", "Obesity, teeth and diabetes risk.", "Camera + auto feeder suit managing alone time and feeding."],
  "oriental-shorthair": ["Talkative and clingy", "Very expressive; suits families that respond to interaction.", "Owners who enjoy play and accept a chatty cat", "25-40 min", "Feed on schedule; watch appetite under stress.", "Teeth, anxiety and breathing issues.", "Interactive tasks + camera suit watching mood."],
  birman: ["Tender and close", "Long-coated but stable-tempered; great for family company.", "Families willing to brush who want a gentle cat", "20-30 min", "Watch hairballs; ensure hydration and fiber.", "Hairballs, cardiac and urinary issues.", "Smart fountain + care reminders recommended."],
  munchkin: ["Playful and affectionate", "Short-legged but curious; provide non-slip floors and easy-to-reach activity furniture.", "Small-space homes that can monitor mobility and joint condition", "20-30 min", "Portion by body condition; avoid excess weight on the limbs.", "Joint, spine and obesity risks.", "Camera + activity reports help spot changes in jumping and movement."],
  "turkish-angora": ["Elegant and active", "Loves climbing and closeness; long coat needs regular grooming.", "Owners who provide high spaces and grooming time", "25-40 min", "Watch hairballs and hydration; avoid weight gain.", "Hairballs, ears and cardiac issues.", "Camera + fountain suit indoor management."],
  rabbit: ["Quiet and sensitive", "Needs hay, chew items and quiet space.", "Families who can provide a fixed hutch and activity area", "30-60 min indoor", "Hay-based diet; control treats.", "Teeth, GI stasis and fright.", "Camera suits watching eating and activity."],
  hamster: ["Nocturnal and curious", "Cage, wheel and stable temperature matter.", "Owners with limited space who can care quietly at night", "Night-time wheel activity", "Dedicated food + a little veg and fruit.", "Temperature, wet tail and escape.", "Camera can watch night-time activity."],
  "guinea-pig": ["Gentle and social", "Needs vitamin C, hay and companion socializing.", "Families who can keep the cage clean steadily", "20-40 min floor time daily", "Supplement vitamin C; ample hay.", "Vitamin-C deficiency, teeth and respiratory.", "A safety profile to log diet and weight fits better."],
  chinchilla: ["Sensitive and lively", "Heat-averse; needs dust baths and a stable environment.", "Owners who can control room temperature and humidity", "Mostly night-time activity", "Dedicated food and hay; avoid high sugar.", "Heatstroke, teeth and GI.", "Camera and temperature alerts fit well."],
  parrot: ["Smart and interactive", "Needs company, toys and safe flight space.", "Families with interaction time who can fly it safely", "30-60 min interaction daily", "Balanced grains, veg/fruit and dedicated feed.", "Feather plucking, boredom and respiratory.", "Camera helps observe state when alone."],
  ferret: ["Curious and active", "Needs an escape-proof environment and rich interaction.", "Owners experienced with small pets who manage the environment", "1-2 hours of activity daily", "High-protein diet; avoid random treats.", "Escape, GI and ingestion.", "Location tags and cameras may link up in future."],
  tortoise: ["Quiet and regular", "Needs temperature/humidity, light and a long-term care plan.", "Owners willing to maintain the environment long term", "Daily basking and slow movement", "High-fiber plant-based food.", "Temperature/humidity, shell and nutrition imbalance.", "A safety profile to log environment parameters fits better."],
  hedgehog: ["Timid and nocturnal", "Needs warmth, quiet and gradual interaction.", "Owners who accept nocturnal habits", "Night-time wheel activity", "Insect protein paired with dedicated feed.", "Temperature, obesity and skin.", "Camera suits night-time observation."]
};

type CarePreset = {
  grooming: { zh: string; en: string };
  environment: { zh: string; en: string };
  safety: { zh: string; en: string };
};

const carePresets: Record<string, CarePreset> = {
  activeDog: {
    grooming: { zh: "每周梳毛 2—3 次，运动后检查脚垫、耳朵和被毛中的异物。", en: "Brush 2–3 times weekly; check paws, ears and coat after outdoor exercise." },
    environment: { zh: "需要稳定的户外运动、嗅闻或训练时间，并在家中保留安静休息区。", en: "Needs regular outdoor exercise, scent work or training plus a quiet recovery area at home." },
    safety: { zh: "外出全程牵引，炎热天气降低强度；高活动日及时补水并观察步态。", en: "Use a leash outdoors, reduce intensity in heat, hydrate well and watch gait after active days." }
  },
  doubleCoatDog: {
    grooming: { zh: "换毛期建议每日梳理底绒，平时每周至少 3 次，并保持皮肤干燥通风。", en: "Brush the undercoat daily during shedding and at least 3 times weekly otherwise; keep skin dry and ventilated." },
    environment: { zh: "更适合凉爽、通风的环境，夏季应提供空调或阴凉休息区。", en: "Best in a cool, well-ventilated home with air conditioning or shaded rest areas in summer." },
    safety: { zh: "避免正午暴晒和高温长跑，出门佩戴定位设备并预留充足饮水。", en: "Avoid midday heat and long hot-weather runs; use location tracking and carry ample water." }
  },
  curlyDog: {
    grooming: { zh: "每 1—2 天梳理卷毛，每 6—8 周修剪一次，并定期清洁耳道和眼周。", en: "Comb curls every 1–2 days, trim every 6–8 weeks, and clean ears and eye areas regularly." },
    environment: { zh: "适合室内生活，但每天仍需散步、嗅闻和短时训练保持身心状态。", en: "Suited to indoor living but still needs daily walks, scent time and short training sessions." },
    safety: { zh: "防止毛发打结牵拉皮肤，洗澡后彻底吹干，并注意牙齿和耳部变化。", en: "Prevent mats, dry the coat thoroughly after bathing, and monitor dental and ear changes." }
  },
  compactDog: {
    grooming: { zh: "每周梳毛并保持眼周、牙齿和脚底清洁，长毛个体需要更频繁护理。", en: "Brush weekly and keep eyes, teeth and paws clean; long-coated individuals need more frequent care." },
    environment: { zh: "适合室内陪伴，准备防滑地面、低台阶和不受打扰的睡眠位置。", en: "Well suited to indoor companionship with non-slip floors, low steps and an undisturbed sleeping spot." },
    safety: { zh: "避免从高处跳落，寒冷时注意保暖，外出使用合身胸背而非猛拉颈部。", en: "Prevent jumps from height, keep warm in cold weather and use a fitted harness rather than neck pulling." }
  },
  flatFaceDog: {
    grooming: { zh: "每日擦拭面部褶皱并保持干燥，每周检查耳道、脚垫和皮肤摩擦处。", en: "Clean and dry facial folds daily; inspect ears, paws and friction areas weekly." },
    environment: { zh: "需要凉爽通风的室内环境，以短时、多次、低强度活动替代长距离运动。", en: "Needs a cool ventilated home and several short low-intensity sessions instead of long exercise." },
    safety: { zh: "高温高湿时减少外出；若呼吸声突然加重、舌色异常或恢复缓慢，应立即停止活动。", en: "Limit outings in heat and humidity; stop immediately if breathing worsens, tongue color changes or recovery is slow." }
  },
  longBackDog: {
    grooming: { zh: "每周梳毛和检查脚趾甲，维持合适体重比频繁美容更重要。", en: "Brush weekly and check nails; maintaining a healthy weight matters more than frequent grooming." },
    environment: { zh: "设置坡道或低台阶，减少上下楼和跳沙发，地面保持防滑。", en: "Use ramps or low steps, reduce stair climbing and sofa jumps, and keep floors non-slip." },
    safety: { zh: "抱起时同时托住胸部和后躯；出现背痛、步态异常或后肢无力应及时就医。", en: "Support both chest and hindquarters when lifting; seek care for back pain, gait changes or hind-leg weakness." }
  },
  shortHairCat: {
    grooming: { zh: "每周梳毛 1—2 次，定期修剪指甲并观察牙齿、耳朵和皮肤。", en: "Brush 1–2 times weekly, trim nails regularly, and monitor teeth, ears and skin." },
    environment: { zh: "提供纵向攀爬、躲藏点、窗边观察位和每日互动游戏。", en: "Provide vertical climbing, hiding places, a window perch and daily interactive play." },
    safety: { zh: "封好纱窗和阳台，控制体重并持续观察饮水量、排尿和活动变化。", en: "Secure windows and balconies, manage weight, and track hydration, urination and activity changes." }
  },
  longHairCat: {
    grooming: { zh: "建议每日或隔日分层梳毛，重点处理腋下、腹部和后腿易打结区域。", en: "Layer-brush daily or every other day, focusing on armpits, belly and hind-leg matting areas." },
    environment: { zh: "保持室内干燥清洁，提供宽敞猫爬架、安静高处和稳定饮水点。", en: "Keep the home clean and dry with roomy cat furniture, quiet high perches and stable water stations." },
    safety: { zh: "关注毛球、皮肤和食欲变化；不要自行剪开贴近皮肤的严重毛结。", en: "Watch hairballs, skin and appetite; do not cut severe mats that sit close to the skin yourself." }
  },
  flatFaceCat: {
    grooming: { zh: "每日清洁眼周和面部褶皱，长毛个体需每日梳理并保持鼻周干净。", en: "Clean eyes and facial folds daily; brush long coats daily and keep the nose area clean." },
    environment: { zh: "适合安静、温度稳定的室内环境，食盆和水盆应便于短鼻结构使用。", en: "Needs a quiet, temperature-stable indoor home with bowls suited to a short muzzle." },
    safety: { zh: "留意泪痕、呼吸和进食困难，避免炎热、粉尘和刺激性香氛。", en: "Monitor tearing, breathing and eating difficulty; avoid heat, dust and strong fragrances." }
  },
  hairlessCat: {
    grooming: { zh: "每周温和清洁皮肤和耳道，及时擦去油脂，洗后彻底保暖。", en: "Gently clean skin and ears weekly, remove excess oils and keep the cat warm after bathing." },
    environment: { zh: "需要温暖、无强烈日晒的室内环境，并准备柔软可清洗的睡眠用品。", en: "Needs a warm indoor home away from strong sun, with soft washable bedding." },
    safety: { zh: "防止晒伤和低温，衣物不可过紧；皮肤红肿或持续瘙痒应咨询兽医。", en: "Prevent sunburn and chilling, avoid tight clothing, and seek advice for redness or persistent itching." }
  },
  activeCat: {
    grooming: { zh: "每周基础梳毛和指甲护理，同时用益智取食与互动游戏满足精力。", en: "Provide weekly coat and nail care plus puzzle feeding and interactive games for mental energy." },
    environment: { zh: "需要高低错落的攀爬路线、稳固猫架、躲藏点和多轮短时互动。", en: "Needs varied climbing routes, sturdy cat trees, hiding spots and several short play sessions." },
    safety: { zh: "固定高处家具并收好绳线、小物和有毒植物，防止高能探索造成误食或坠落。", en: "Anchor tall furniture and remove strings, small objects and toxic plants to prevent ingestion or falls." }
  },
  jointSensitiveCat: {
    grooming: { zh: "每周梳毛并观察其是否抗拒触碰四肢、尾部或脊柱，不强迫大幅度拉伸。", en: "Brush weekly and note resistance around limbs, tail or spine; never force wide joint movement." },
    environment: { zh: "使用低入口猫砂盆、缓坡和防滑垫，让食水、睡眠区容易到达。", en: "Use a low-entry litter tray, gentle ramps and non-slip mats so food, water and rest are easy to reach." },
    safety: { zh: "控制体重并减少高处跳跃；步态、跳跃意愿或如厕姿势变化应及时记录。", en: "Manage weight and reduce high jumps; record changes in gait, willingness to jump or toileting posture." }
  },
  rabbit: {
    grooming: { zh: "每周梳毛，换毛期增加频率；定期检查门齿、脚底和指甲。", en: "Brush weekly and more often during shedding; inspect front teeth, feet and nails." },
    environment: { zh: "提供干草、躲藏屋、磨牙物和每天可安全活动的围栏区域。", en: "Provide hay, a hide box, chew items and a secure exercise pen every day." },
    safety: { zh: "不能长时间禁食；食欲、粪便量或活动明显下降时应尽快联系异宠兽医。", en: "Rabbits must not fast; seek an exotic vet quickly for reduced appetite, droppings or activity." }
  },
  hamster: {
    grooming: { zh: "通常无需水洗，定期局部清洁笼舍并保留少量熟悉垫料降低压力。", en: "Avoid water baths; spot-clean the habitat while retaining some familiar bedding to reduce stress." },
    environment: { zh: "准备足够深的垫料、无夹脚跑轮、躲藏屋和稳定的夜间安静环境。", en: "Provide deep bedding, a solid running wheel, hides and a quiet stable night-time environment." },
    safety: { zh: "防止逃逸、过热和高处跌落；白天尽量不要强行叫醒或频繁抓取。", en: "Prevent escape, overheating and falls; avoid waking or handling the hamster repeatedly during the day." }
  },
  guineaPig: {
    grooming: { zh: "每周梳毛并检查脚底、牙齿和指甲，长毛个体需更频繁整理。", en: "Brush weekly and inspect feet, teeth and nails; long-haired guinea pigs need more frequent care." },
    environment: { zh: "需要宽敞平层空间、充足干草、躲藏点，并保持同伴社交和环境清洁。", en: "Needs a roomy single-level habitat, abundant hay, hides, companionship and clean bedding." },
    safety: { zh: "每日补充合适维生素 C；突然不吃、流口水或呼吸异常需尽快就医。", en: "Provide appropriate daily vitamin C; seek care quickly for appetite loss, drooling or breathing changes." }
  },
  chinchilla: {
    grooming: { zh: "每周提供数次浴沙，不水洗；定期检查毛发、脚底和持续生长的牙齿。", en: "Offer dust baths several times weekly, never water-bathe, and inspect coat, feet and growing teeth." },
    environment: { zh: "保持凉爽低湿，提供多层跳台、咀嚼物和白天安静休息空间。", en: "Keep the habitat cool and dry with platforms, chew items and a quiet daytime rest area." },
    safety: { zh: "对高温非常敏感，室温升高或精神沉郁时立即降温并联系异宠兽医。", en: "Highly heat-sensitive; cool the environment and contact an exotic vet if temperature rises or energy drops." }
  },
  parrot: {
    grooming: { zh: "保持浴水、栖木和笼具清洁，观察羽毛、喙和爪，不自行过度剪羽。", en: "Keep bathing water, perches and housing clean; monitor feathers, beak and claws and avoid excessive wing clipping." },
    environment: { zh: "需要安全飞行或展翅空间、不同粗细栖木、益智玩具和稳定社交。", en: "Needs safe flight or wing-stretch space, varied perches, enrichment toys and regular social contact." },
    safety: { zh: "远离不粘锅高温烟雾、香薰、开放窗户和有毒植物，放飞前关闭风扇。", en: "Keep away from overheated non-stick fumes, fragrances, open windows and toxic plants; switch off fans before flight." }
  },
  ferret: {
    grooming: { zh: "定期修剪指甲、清洁耳道并检查皮肤，避免频繁洗澡破坏皮脂平衡。", en: "Trim nails, clean ears and inspect skin regularly; avoid frequent bathing that disrupts natural oils." },
    environment: { zh: "提供防逃逸活动区、隧道、吊床和每天多次有人看护的探索时间。", en: "Provide an escape-proof area, tunnels, hammocks and several supervised exploration periods daily." },
    safety: { zh: "封堵狭缝并收好橡胶、泡棉和小物件，防止误食和钻入家电。", en: "Block gaps and remove rubber, foam and small objects to prevent ingestion or entry into appliances." }
  },
  tortoise: {
    grooming: { zh: "保持甲壳和四肢清洁，定期称重，避免涂油或使用不明甲壳护理品。", en: "Keep shell and limbs clean, weigh regularly, and avoid oils or unverified shell products." },
    environment: { zh: "按物种配置温度梯度、UVB 光照、湿度、垫材和可躲藏空间。", en: "Provide species-appropriate heat gradients, UVB, humidity, substrate and hiding space." },
    safety: { zh: "不要混养来源不明个体；食欲、甲壳硬度或活动变化需由异宠兽医评估。", en: "Do not mix animals of unknown origin; appetite, shell or activity changes require exotic-vet assessment." }
  },
  hedgehog: {
    grooming: { zh: "保持跑轮和脚部清洁，必要时温水浅浴并彻底擦干保暖。", en: "Keep the wheel and feet clean; use a shallow warm bath only when needed and dry thoroughly." },
    environment: { zh: "提供稳定温暖的夜行环境、实心跑轮、躲藏屋和柔软无尘垫材。", en: "Provide a consistently warm nocturnal habitat, solid wheel, hide and soft low-dust bedding." },
    safety: { zh: "防止低温休眠、肥胖和高处跌落；持续蜷缩、拒食或步态异常应就医。", en: "Prevent chilling, obesity and falls; seek care for persistent curling, appetite loss or gait changes." }
  }
};

const lifespanBySlug: Record<string, string> = {
  "golden-retriever": "10—12 年", corgi: "12—15 年", shiba: "12—15 年", "border-collie": "12—15 年", poodle: "12—16 年", labrador: "10—12 年", samoyed: "12—14 年", beagle: "12—15 年", "french-bulldog": "10—12 年", husky: "12—14 年", "german-shepherd": "9—13 年", bichon: "12—15 年", akita: "10—13 年", "mini-schnauzer": "12—15 年", "alaskan-malamute": "10—14 年", "yorkshire-terrier": "13—16 年", pomeranian: "12—16 年", chihuahua: "14—17 年", dachshund: "12—16 年", "australian-shepherd": "12—15 年",
  "british-shorthair": "12—17 年", ragdoll: "12—17 年", "maine-coon": "10—14 年", "orange-cat": "12—18 年", siamese: "12—18 年", "american-shorthair": "13—17 年", persian: "12—16 年", sphynx: "9—15 年", "norwegian-forest": "12—16 年", "devon-rex": "10—15 年", bengal: "12—16 年", "scottish-fold": "11—15 年", "russian-blue": "15—20 年", "exotic-shorthair": "12—15 年", abyssinian: "12—15 年", burmese: "14—18 年", "oriental-shorthair": "12—15 年", birman: "12—16 年", munchkin: "12—15 年", "turkish-angora": "12—18 年",
  rabbit: "8—12 年", hamster: "2—3 年", "guinea-pig": "5—8 年", chinchilla: "10—15 年", parrot: "10—50 年（因种类而异）", ferret: "6—10 年", tortoise: "30—80 年以上（因种类而异）", hedgehog: "3—6 年"
};

const carePresetBySlug: Record<string, string> = {
  "golden-retriever": "activeDog", corgi: "longBackDog", shiba: "activeDog", "border-collie": "activeDog", poodle: "curlyDog", labrador: "activeDog", samoyed: "doubleCoatDog", beagle: "activeDog", "french-bulldog": "flatFaceDog", husky: "doubleCoatDog", "german-shepherd": "activeDog", bichon: "curlyDog", akita: "doubleCoatDog", "mini-schnauzer": "curlyDog", "alaskan-malamute": "doubleCoatDog", "yorkshire-terrier": "compactDog", pomeranian: "doubleCoatDog", chihuahua: "compactDog", dachshund: "longBackDog", "australian-shepherd": "activeDog",
  "british-shorthair": "shortHairCat", ragdoll: "longHairCat", "maine-coon": "longHairCat", "orange-cat": "shortHairCat", siamese: "activeCat", "american-shorthair": "shortHairCat", persian: "flatFaceCat", sphynx: "hairlessCat", "norwegian-forest": "longHairCat", "devon-rex": "hairlessCat", bengal: "activeCat", "scottish-fold": "jointSensitiveCat", "russian-blue": "shortHairCat", "exotic-shorthair": "flatFaceCat", abyssinian: "activeCat", burmese: "activeCat", "oriental-shorthair": "activeCat", birman: "longHairCat", munchkin: "jointSensitiveCat", "turkish-angora": "longHairCat",
  rabbit: "rabbit", hamster: "hamster", "guinea-pig": "guineaPig", chinchilla: "chinchilla", parrot: "parrot", ferret: "ferret", tortoise: "tortoise", hedgehog: "hedgehog"
};

export const breeds: Breed[] = rows.map(([slug, name, englishName, species, size, temperament, careLevel, activityLevel, summary, suitablePeople, dailyExercise, feedingTips, healthRisks, deviceSuggestion, coverImage, tagText]) => {
  const t = en[slug];
  const L = (zh: string, idx: number) => ({ zh, en: t ? t[idx] : zh });
  const preset = carePresets[carePresetBySlug[slug]];
  const healthZh = healthRisks.replace(/[。.]$/, "");
  const healthEn = (t?.[5] ?? healthRisks).replace(/[。.]$/, "");
  const lifespanEn = slug === "parrot" ? "10–50 years, depending on species"
    : slug === "tortoise" ? "30–80+ years, depending on species"
      : lifespanBySlug[slug].replace(" 年", " years");
  return {
    id: slug,
    slug,
    name: { zh: name, en: englishName },
    englishName,
    species: species as Breed["species"],
    size,
    temperament: L(temperament, 0),
    careLevel,
    activityLevel,
    activity: activityLevel,
    summary: L(summary, 1),
    suitablePeople: L(suitablePeople, 2),
    dailyExercise: L(dailyExercise, 3),
    feedingTips: L(feedingTips, 4),
    healthRisks: L(healthRisks, 5),
    deviceSuggestion: L(deviceSuggestion, 6),
    lifespan: { zh: `约 ${lifespanBySlug[slug]}`, en: `About ${lifespanEn}` },
    groomingNeeds: preset.grooming,
    environmentNeeds: preset.environment,
    safetyTips: {
      zh: `重点留意${healthZh}。${preset.safety.zh}`,
      en: `Watch for ${healthEn.toLowerCase()}. ${preset.safety.en}`
    },
    coverImage,
    image: coverImage,
    tags: tagText.split(",")
  };
});
