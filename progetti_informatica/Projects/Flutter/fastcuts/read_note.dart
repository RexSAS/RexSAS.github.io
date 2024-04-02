import 'package:flutter/material.dart';
import 'home.dart';
import 'db/db.dart';


class read_note extends StatefulWidget {
  String title;
  String note;
  int? id;
  read_note({Key? key, required this.title, required this.note, required this.id}) : super(key: key);

  @override
  State<read_note> createState() => _read_noteState();
}

class _read_noteState extends State<read_note> with SingleTickerProviderStateMixin{
  final noteController = TextEditingController();
  String title = '';
  String note = '';
  int? id;
  @override
  void initState() {
    title = widget.title;
    noteController.text = widget.note;
    id = widget.id;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Container(
        decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [
                principalColor,
                secondaryColor
              ],
            ),
        ),
        child: Column(
          children: [
            const SizedBox(height: 25,),
            ListTile(title: Text(title, style: const TextStyle(fontSize: 25, color: Colors.white, fontWeight: FontWeight.bold),),),
            const Divider(color: Colors.white,thickness: 2.5,),
            const SizedBox(height: 80,),
            Expanded(
              child: TextField(
                controller: noteController,
                keyboardType: TextInputType.multiline,
                maxLines: null,
                decoration: const InputDecoration(
                  hintText: "Some notes",
                  prefix: SizedBox(width: 20,),
                  suffix: SizedBox(width: 20,),
                  hintStyle: TextStyle(color: Colors.white)
                ),
                style: const TextStyle(color: Colors.white,),
              )
            )
          ],
        ),  
      ),
      floatingActionButton: SizedBox( 
        width: 60,
        height: 60,
        child: FloatingActionButton(
          onPressed: () async{
          if(noteController != ''){
            await DatabaseHelper.instance.add(Shortcut(name: title, type: 3, todo: noteController.text));
            await DatabaseHelper.instance.remove(id!);
            Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Home()),
                    );
          }
        },
          child: const Icon(Icons.save_alt_outlined),
          foregroundColor: Colors.white,
          backgroundColor: principalColor,
          splashColor: Colors.white60,
        ),
      ),
    );
  }
}





/*
class read_note extends StatelessWidget {
  final String title;
  final String note;
  final noteController = TextEditingController();

  read_note({Key? key, required this.title, required this.note}) : super(key: key);

@override
  void initState() {
    super.initState();

    noteController.text = note;
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Container(
        decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [
                principalColor,
                secondaryColor
              ],
            ),
        ),
        child: Column(
          children: [
            SizedBox(height: 25,),
            ListTile(title: Text(title, style: const TextStyle(fontSize: 25, color: Colors.white, fontWeight: FontWeight.bold),),),
            const Divider(color: Colors.white,thickness: 2.5,),
            SizedBox(height: 80,),
            TextField(
              controller: noteController,
            )
          ],
        ),  
      ),
    );
  }
}
*/