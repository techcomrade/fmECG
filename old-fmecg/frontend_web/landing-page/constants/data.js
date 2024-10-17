const ECG = {
    name: 'fmECG',
    subtitle: 'Hệ thống theo dõi và quản lý dữ liệu điện tim.',
    subtitle2: 'Dự án quản lý dữ liệu điện tim',
    welcome: {
        description: 'Dự án fmECG nhằm phát triển một hệ thống thông minh giúp thu thập, xử lý, và quản lý dữ liệu điện tim từ bệnh nhân. Hệ thống này sẽ hỗ trợ người dùng trong việc theo dõi sức khỏe hàng ngày, cung cấp cho bác sĩ và bệnh viện công cụ hữu ích trong việc quản lý và chẩn đoán. Đặc biệt, dữ liệu từ bệnh nhân sẽ được lưu trữ và bảo mật, đảm bảo tính liên tục và khả năng truy cập cho các chuyên gia y tế khi cần thiết.',
        list: [
            'Giao diện bắt mắt, dễ sử dụng',
            'Hiển thị dữ liệu trực quan',
            'Bảo mật thông tin'
        ]
    },
    services: [
        {
            iconClass: 'flaticon-electrocardiogram',
            name: 'Thu thập và xử lý dữ liệu điện tim',
            description: 'Dữ liệu được lấy từ các thiết bị điện tim đeo tay hoặc đặt gần bệnh nhân và truyền qua Bluetooth về ứng dụng di động.'
        },
        {
            iconClass: 'flaticon-emergency-call',
            name: 'Quản lý và lưu trữ dữ liệu',
            description: 'Dữ liệu được lưu trữ trên hệ thống máy chủ, có thể truy xuất dễ dàng thông qua ứng dụng web dành cho bệnh nhân và bác sĩ. Hệ thống đảm bảo tính bảo mật và quyền riêng tư của bệnh nhân.'
        },
        {
            iconClass: 'flaticon-first-aid-kit',
            name: 'Hiển thị dữ liệu một cách trực quan',
            description: 'Dữ liệu được chuyển đổi thành các bảng biểu và đồ thị, giúp bệnh nhân và bác sĩ dễ dàng phân tích và theo dõi tình trạng sức khỏe.'
        },
    ],
    process: {
        steps: [
            {
                name: 'Thiết bị',
                description: 'Bệnh nhân đeo thiết bị điện tim có khả năng thu thập dữ liệu sinh học.'
            },
            {
                name: 'App di động',
                description: 'Thiết bị điện tim kết nối với ứng dụng qua Bluetooth, dữ liệu được gửi từ thiết bị tới app.'
            },
            {
                name: 'Server',
                description: 'App di động đồng bộ dữ liệu với server, nơi dữ liệu được lưu trữ an toàn và phân tích.'
            },
            {
                name: 'Thiết bị',
                description: 'Bác sĩ hoặc bệnh viện có thể truy cập dữ liệu từ máy chủ thông qua ứng dụng web, với giao diện trực quan hiển thị thông tin dưới dạng bảng biểu và đồ thị.'
            },
        ],
        img: 'img/about/1.png'
    },
    functions: [
        {
            name: 'Ứng dụng di động',
            list: [
                'Nhận dữ liệu từ thiết bị điện tim qua kết nối Bluetooth.',
                'Hiển thị dữ liệu điện tim cho người dùng trên giao diện trực quan.',
                'Đồng bộ dữ liệu với máy chủ để lưu trữ và phân tích lâu dài.',
                'Cảnh báo và nhắc nhở người dùng trong các trường hợp kết quả điện tim không ổn định.',
            ]
        },
        {
            name: 'Ứng dụng web (web admin)',
            list: [
                'Dành cho bác sĩ, bệnh viện và bệnh nhân để theo dõi tình trạng sức khỏe.',
                'Hiển thị dữ liệu điện tim dưới dạng bảng biểu, đồ thị, cung cấp các công cụ phân tích chi tiết.',
                'Quản lý hồ sơ bệnh nhân, bác sĩ và quyền truy cập dữ liệu.',
                'Chức năng báo cáo và xuất dữ liệu cho các nghiên cứu lâm sàng hoặc y tế.',
            ]
        }
    ],
    technology: {
        subtitle: 'Hệ thống fmECG được phát triển dựa trên các công nghệ hiện đại, đảm bảo hiệu suất và bảo mật cao',
        list: [
            {
                name: 'Ứng dụng di động (app)',
                description: 'Sử dụng Flutter, một framework đa nền tảng, giúp phát triển nhanh chóng cho cả Android và iOS',
                iconImg: [
                    'img/fmECG/flutter.png'
                ]
            },
            {
                name: 'Ứng dụng web (web admin)',
                description: 'Xây dựng trên ReactJS để tạo giao diện người dùng mượt mà và NodeJS cho backend, xử lý các tác vụ liên quan đến dữ liệu và kết nối với máy chủ',
                iconImg: [
                    'img/fmECG/React.webp',
                    'img/fmECG/nodejs.png'
                ]
            },
            {
                name: 'Máy chủ (server)',
                description: 'Server sẽ lưu trữ dữ liệu, xử lý yêu cầu và quản lý dữ liệu từ app và web. Các công nghệ cloud như AWS hoặc Google Cloud có thể được sử dụng để đảm bảo tính sẵn sàng và mở rộng dễ dàng.',
                iconImg: [
                    'img/fmECG/aws.png'
                ]
            },
            {
                name: 'Cơ sở dữ liệu',
                description: 'Sử dụng các hệ quản trị cơ sở dữ liệu như MongoDB hoặc PostgreSQL để lưu trữ hồ sơ bệnh nhân và dữ liệu điện tim.',
                iconImg: [
                    'img/fmECG/mongodb.png',
                    'img/fmECG/postgresql.png'
                ]
            },
        ]
    },
    advice: [
        {
            name: 'Lợi ích với bệnh nhân',
            tabId: 'patient',
            list: [
                'Bệnh nhân có thể dễ dàng theo dõi tình trạng sức khỏe của mình mọi lúc, mọi nơi thông qua app.',
                'Cảnh báo và thông báo kịp thời khi phát hiện vấn đề bất thường về nhịp tim.',
                'Giúp bệnh nhân duy trì liên lạc với bác sĩ trong các tình huống cần thiết.'
            ]
        },
        {
            name: 'Lợi ích với bác sĩ và quản trị viên',
            tabId: 'doctor',
            list: [
                'Cung cấp công cụ theo dõi và quản lý bệnh nhân một cách khoa học và chính xác.',
                'Hỗ trợ đưa ra quyết định lâm sàng nhanh chóng và chính xác thông qua dữ liệu lịch sử của bệnh nhân.',
                'Hệ thống quản lý hồ sơ bệnh nhân dễ dàng, giúp tiết kiệm thời gian và nâng cao hiệu quả công việc.'
            ]
        }
    ]
}

export default ECG