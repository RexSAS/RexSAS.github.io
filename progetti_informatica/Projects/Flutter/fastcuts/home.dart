import 'dart:io';
import 'package:fastcut/read_note.dart';
import 'package:flutter/material.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'add_cut.dart';
import 'read_note.dart';
import 'photo_view.dart';
import 'package:url_launcher/url_launcher.dart';
import 'main.dart';
import 'package:fastcut/db/db.dart';
import 'package:shared_preferences/shared_preferences.dart';

Color principalColor = Color.fromARGB(255, 104, 104, 104);
Color secondaryColor = Color.fromARGB(255, 0, 0, 0);
const buttonShadow = Color.fromARGB(255, 255, 255, 255);

class Home extends StatefulWidget {
  const Home({ super.key });

  @override
  State<Home> createState() => HomeState();
}

class HomeState extends State<Home>{

Color pickerColor = Color.fromARGB(255, 255, 0, 0);
late SharedPreferences prefs;

@override
  void initState() {
    super.initState();

  init();
  }

  Future init() async{
    prefs = await SharedPreferences.getInstance();

    int? Pcolor = prefs.getInt('Pcolor');
    if(Pcolor == null)return;

    setState(() {
      principalColor = Color(Pcolor);
    });

    int? Scolor = prefs.getInt('Scolor');
    if(Scolor == null)return;

    setState(() {
      secondaryColor = Color(Scolor);
    });

    
  }

  @override
  Widget build(BuildContext context) {
var height = (MediaQuery.of(context).size.height);
var width = (MediaQuery.of(context).size.width);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        flexibleSpace: header(),
        toolbarHeight: 80,
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      extendBodyBehindAppBar: true,
      body: Container(
        decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [
                principalColor,
                secondaryColor,
              ],
            ),
        ),
        child: FutureBuilder<List<Shortcut>>(
                    future: DatabaseHelper.instance.getShortcuts(),
                    builder: (BuildContext context, AsyncSnapshot<List<Shortcut>> snapshot){
                      if(!snapshot.hasData){
                        return const Center(child: Text('Loading...', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),),);
                      }
                      return snapshot.data!.isEmpty
                      ? const Center(child: Text('No Shortcuts here', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),),)
                      : ListView(
                        children: snapshot.data!.map((shortcut) {


                          if(shortcut.type == 1){
                            return Center(
                            child: Dismissible(
                              onDismissed: (direction) {
                                DatabaseHelper.instance.remove(shortcut.id!);
                                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${shortcut.name} deleted')));
                              },
                              key: ValueKey(this),
                              background: Container(color: Colors.red, child: Icon(Icons.delete_outline),alignment: Alignment.centerLeft,),
                              secondaryBackground: Container(color: Colors.red, child: Icon(Icons.delete_outline),alignment: Alignment.centerRight,),
                              child: CButton(onClick: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => photo_view(path: shortcut.todo),
                              ));
                            }, nameText: shortcut.name, icon: const Icon(Icons.image_outlined)),
                            )


                          );



                          }else if(shortcut.type == 2){
                            return Center(
                            child: Dismissible(
                              key: ValueKey(this),
                              background: Container(color: Colors.red, child: Icon(Icons.delete_outline),alignment: Alignment.centerLeft,),
                              secondaryBackground: Container(color: Colors.red, child: Icon(Icons.delete_outline),alignment: Alignment.centerRight,),
                              onDismissed: (direction) {
                                DatabaseHelper.instance.remove(shortcut.id!);
                                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${shortcut.name} deleted')));
                              },
                              child: CButton(onClick: () async{
                              Uri url = Uri.parse(shortcut.todo);
                                if(await canLaunchUrl(url)) {
                                  await launchUrl(url);
                                }else{
                                  await launchUrl(url);
                                }

                              }, nameText: shortcut.name, icon: const Icon(Icons.link_outlined)),
                            )


                          );
                          }else if(shortcut.type == 3){
                            return Center(
                            child: Dismissible(
                              key: ValueKey(this),
                              background: Container(color: Colors.red, child: Icon(Icons.delete_outline),alignment: Alignment.centerLeft,),
                              secondaryBackground: Container(color: Colors.red, child: Icon(Icons.delete_outline),alignment: Alignment.centerRight,),
                              onDismissed: (direction) {
                                DatabaseHelper.instance.remove(shortcut.id!);
                                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${shortcut.name} deleted')));
                              },
                              child: CButton(onClick: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => new read_note(title: shortcut.name, note: shortcut.todo, id: shortcut.id,),
                              ));
                              }, nameText: shortcut.name, icon: const Icon(Icons.notes)),
                            )


                          );
                          }



                          return Center(
                            child: CButton(onClick: () {}, nameText: "ERROR", icon: const Icon(Icons.link_outlined))
                          );
                        }).toList(),
                      );
                    },
                  ),
      ),
      floatingActionButton: SizedBox( 
        width: 60,
        height: 60,
        child: FloatingActionButton(
          onPressed: () {
                    Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const add_cut()),
                    );
                  },
          child: const Icon(Icons.add),
          foregroundColor: Colors.white,
          backgroundColor: principalColor,
          splashColor: Colors.white60,
        ),
      ),
    );
  }




void changeColor(Color color) {
  setState(() => pickerColor = color);
}

    Widget buildColorPicker() => ColorPicker(
    enableAlpha: false,
    pickerColor: pickerColor,
    onColorChanged: changeColor,
  );

  void pickPColor(BuildContext context) => showDialog (
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Pick color'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          buildColorPicker(),
          TextButton(
        child: const Text(
          'Select'
        ),
        onPressed: () async{
          prefs.setInt('Pcolor', pickerColor.value);
          setState(() => principalColor = pickerColor);
          Navigator.of(context).pop();
        }
      ),
        ],
      )
    ),
  );
  void pickSColor(BuildContext context) => showDialog (
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Pick color'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          buildColorPicker(),
          TextButton(
        child: const Text(
          'Select'
        ),
        onPressed: () async{
          prefs.setInt('Scolor', pickerColor.value);
          setState(() => secondaryColor = pickerColor);
          Navigator.of(context).pop();
        }
      ),
        ],
      )
    ),
  );


header(){
  return Padding(
    padding: const EdgeInsets.only(top:25,left: 5.5,right: 5.5),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ListTile(
          trailing: CircleAvatar(
            foregroundColor: Colors.white,
            backgroundColor: Colors.transparent,
            child: ElevatedButton(
          onPressed:() {
                    showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      children: [
                        Container(
                      width: 50,
                      height: 50,
                      decoration:  BoxDecoration(borderRadius: const BorderRadius.all(Radius.circular(100)), color: principalColor,),
                    ),
                    const SizedBox(width: 20,),
                    ElevatedButton(
                      child: const Text('Primary'),
                      onPressed: () {
                        pickPColor(context);
                      },
                    ),
                      ],
                    ),
                    const SizedBox(height: 20,),
                    Row(
                      children: [
                        Container(
                      width: 50,
                      height: 50,
                      decoration: BoxDecoration(borderRadius: const BorderRadius.all(Radius.circular(100)), color: secondaryColor,),
                    ),
                    const SizedBox(width: 20,),
                    ElevatedButton(
                      child: const Text('Secondary'),
                      onPressed: () {
                        pickSColor(context);
                      },
                    ),
                      ],
                    )
                    
                  ],
                ),
              );
            },
          );
                  },
          child: Icon(Icons.color_lens),
          style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(Colors.transparent),
            elevation: MaterialStateProperty.all(0),
          ),
        ),
          ),
          title: Text(' My Shortcuts', style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500,),),
          textColor: Colors.white,
        ),
        const Divider(
            color: Colors.white,
          thickness: 2.5,
        )
      ],
    ),
  );
}

}



class CButton extends StatelessWidget {
  CButton({ Key? key , required this.onClick, required this.nameText, required this.icon}) : super(key: key);
  VoidCallback onClick;
  String nameText;
  Icon icon;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClick,
      child: Container(
        margin: const EdgeInsets.only(left: 20, right: 20, top: 5),
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: buttonShadow.withOpacity(0.5),
              spreadRadius: 5,
              blurRadius: 15,
              offset: const Offset(0, 3),
            ),
          ],
          gradient: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [
                secondaryColor,
                principalColor
              ],
            ),
          borderRadius: BorderRadius.circular(10.0)
        ),
        child: ListTile(
          trailing: CircleAvatar(
            foregroundColor: Colors.white,
            backgroundColor: Colors.transparent,
            child: icon,
          ),
          title: Text(nameText),
          textColor: Colors.white,
        ),
      ),
    );
  }


}







/*




FutureBuilder<List<Shortcut>>(
                    future: DatabaseHelper.instance.getShortcuts(),
                    builder: (BuildContext context, AsyncSnapshot<List<Shortcut>> snapshot){
                      if(!snapshot.hasData){
                        return const Center(child: Text('Loading...', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),),);
                      }
                      return snapshot.data!.isEmpty
                      ? Center(child: Text('No Shortcuts here', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),),)
                      : ListView(
                        children: snapshot.data!.map((shortcut) {
                          return Center(
                            child: ListTile(
                              title: Text(shortcut.name),
                            ),
                          );
                        }).toList(),
                      );
                    },
                  ),

*/