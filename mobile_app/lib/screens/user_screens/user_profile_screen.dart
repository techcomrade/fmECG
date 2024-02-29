import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../constants/color_constant.dart';

class UserProfileScreen extends StatefulWidget {
  const UserProfileScreen({Key? key}) : super(key: key);

  @override
  _UserProfileScreenState createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  TextEditingController _nameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _bioController = TextEditingController();
  TextEditingController _locationController = TextEditingController();

  // Get battery level.

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: 'Thai Dong');
    _emailController = TextEditingController(text: 'thai.dong@gmail.com');
    _bioController = TextEditingController(text: 'fmECG is my life');
    _locationController = TextEditingController(text: 'Hanoi');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _bioController.dispose();
    _locationController.dispose();
    super.dispose();
  }

  Widget _buildListTile({required String title, required IconData icon, required Color iconColor, VoidCallback? onTap}) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 4), // Khoảng cách giữa các ListTile
      decoration: BoxDecoration(
        border: Border.all(color: Colors.white10), // Viền xám cho mỗi ListTile
        borderRadius: BorderRadius.circular(10), // Góc bo tròn
      ),
      child: ListTile(
        title: Text(title, style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize:13,
        ),
        )
        ,
        leading: Icon(icon, color: iconColor),
        onTap: onTap,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("User Profile"),
          backgroundColor: ColorConstant.primary, // Màu sắc của AppBar
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.all(13.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(height: 20),
                CircleAvatar(
                  radius: 60,
                  backgroundImage: AssetImage('assets/images/doctor.png'),
                  backgroundColor: Colors.transparent, // Set the background color to transparent

                ),
                SizedBox(height: 5),
                Text(
                  'Viet Hoang',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
                Text(
                  'Hà Nội, Việt Nam',
                  style: TextStyle(
                    fontWeight: FontWeight.normal,
                    fontSize: 14,
                    color: Colors.black54,
                  ),
                ),
                SizedBox(height: 20),
                Container(
                  height: 100,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: <Widget>[
                      InfoCard(title: 'Age', value: '30', unit: 'years'),
                      InfoCard(title: 'Weight', value: '90', unit: 'kg'),
                      InfoCard(title: 'Height', value: '190', unit: 'cm'),
                    ],
                  ),
                ),
                SizedBox(height: 20),
                _buildListTile(title: 'Personal Info', icon: Icons.person, iconColor: Colors.blue, onTap: () {}),
                _buildListTile(title: 'My Appointments', icon: Icons.calendar_today, iconColor: Colors.orange, onTap: () {}),
                _buildListTile(title: 'My Doctors', icon: Icons.local_hospital, iconColor: Colors.red, onTap: () {}),
                _buildListTile(title: 'EHR Files', icon: Icons.folder, iconColor: Colors.green, onTap: () {}),
                _buildListTile(title: 'Wallet', icon: Icons.account_balance_wallet, iconColor: Colors.purple, onTap: () {}),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
// Custom InfoCard widget with Title
class InfoCard extends StatelessWidget {
  final String title;
  final String value;
  final String unit;

  const InfoCard({
    Key? key,
    required this.title,
    required this.value,
    required this.unit,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(5),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Container(
        width: 150,
        decoration: BoxDecoration(
          color: Colors.grey[100],
          borderRadius: BorderRadius.circular(15),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              title,
              style: TextStyle(
                color: Colors.black45,
                fontSize: 10,
                fontWeight: FontWeight.normal,
              ),
            ),
            SizedBox(height: 4),
            Text(
              '$value $unit',
              style: TextStyle(
                fontSize: 16,
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

