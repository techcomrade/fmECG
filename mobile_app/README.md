# bluetooth_ecg

build apk: 
`
flutter build apk --no-shrink --no-tree-shake-icons
flutter build appbundle --no-tree-shake-icons
`

**NOTE**
**Java version**: 17
Change **JAVA_HOME** in `gradle.properties` (Check your Java path in Android Studio -> File -> Project Struture -> SDKs -> Choose SDK Java 17 -> Copy path)
**Flutter version**: 3.16.9
App đang sử dụng FVM (Flutter Version Management), trước khi chạy code kiểm tra xem Flutter có đang dùng FVM không bằng cách `flutter --version`, nếu chưa trả ra phiên bản 3.16.9, cần kiểm tra lại hoặc liên hệ với owner.
