import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/foundation/key.dart';


class AccountTypeSelection extends StatefulWidget {
  const AccountTypeSelection({Key? key}) : super(key: key);

  @override
  State<AccountTypeSelection> createState() => _AccountTypeSelectionState();
}

class _AccountTypeSelectionState extends State<AccountTypeSelection> {
  final List<String> titles = <String>[
    'Emre Kaplan',
    'Oğuzcan',
  ];
  final List<String> ids = <String>[
    'id-123',
    'id-134',
  ];
  String? cardGroupResult;
  int selectedCard = -1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
          Text("Type of Account"),
          const SizedBox(height: 20),
          Text("Choose a type of your account"),
          // SelectGroupCard(context, 
            
          //   titles: titles, 
          //   ids: ids,
          //   onTap: (title, id) {
          //     setState(() {
          //       cardGroupResult = title + " " + id;
          //     });
          //   },
          // ),
          // GridView.builder(
          // shrinkWrap: false,
          // scrollDirection: Axis.vertical,
          // itemCount: 2,
          // gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          //   crossAxisCount: 1,
          // ),
          // itemBuilder: (BuildContext context, int index) {
          //   return InkWell(
          //     onTap: () {
          //       setState(() {
          //         selectedCard = index;
          //       });
          //     },
          //     child: Card(
          //       color: selectedCard == index ? Colors.blue : Colors.amber,
          //       child: Container(
          //         height: 200,
          //         width: 200,
          //         child: Center(
          //           child: Text(
          //             '$index',
          //             style: TextStyle(
          //               fontSize: 20,
          //               color: Colors.white,
          //               fontWeight: FontWeight.w500,
          //             ),
          //           ),
          //         ),
          //       ),
          //     ),
          //   );
          // }),
        ])
      ),
    );
  }
}