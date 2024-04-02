import 'package:flutter/material.dart';
import 'home.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'db/db.dart';

class add_cut extends StatefulWidget {
  const add_cut({super.key});

  

  @override
    State<add_cut> createState() => _add_cut();
  }
class _add_cut extends State<add_cut> {

  final titleController = TextEditingController();
  final urlController = TextEditingController();
  final noteController = TextEditingController();
  int type = 0;

  List<String> items = ['Image', 'Link', 'Note'];
  String? selectedItem  = 'Image';
  String imagePath = '';
  @override
  Widget build(BuildContext context) {
var height = (MediaQuery.of(context).size.height);
var width = (MediaQuery.of(context).size.width);
    return Scaffold(
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
            SizedBox(height: 25%height,),
            TextField(
              controller: titleController,
              decoration: const InputDecoration(
                hintText: "Title",
                hintStyle: TextStyle(color: Colors.white),
                prefix: SizedBox(width: 20,),
                suffix: Icon(Icons.edit, color: Colors.white,)
              ),
              maxLength: 25,
              style: TextStyle(color: Colors.white, fontSize: 28,fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 25%height,),
            SizedBox(
              width: width-50,
              child: DropdownButtonFormField<String>(
                iconEnabledColor: Colors.white,
                dropdownColor: secondaryColor,
                value: selectedItem,
                items: items.map((item) => DropdownMenuItem<String>(value: item,child: Text(item, style: const TextStyle(fontSize: 20, color: Colors.white),),)).toList(),
                onChanged: (item) => setState(() => selectedItem = item),
              ),
            ),
            SizedBox(height: 35%height,),
            // IMAGE
            if(selectedItem == 'Image') loadButton(onClick:() {pickImage();}, nameText: const Text("Load an image"), icon: const Icon(Icons.image_outlined)),
            if(selectedItem == 'Image' && imagePath != '')
              SizedBox(width: width-100%width,child: Image.file(File(imagePath)),),

            // LINK
            if(selectedItem == 'Link') TextField(
              controller: urlController,
              decoration: const InputDecoration(
                hintText: "https://url",
                hintStyle: TextStyle(color: Colors.white),
                prefix: SizedBox(width: 20,),
                suffix: Icon(Icons.edit, color: Colors.white,),
              ),
              style: const TextStyle(color: Colors.white, fontSize: 18),
            ),

            // NOTE
            if(selectedItem == 'Note') Expanded(
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
          if(titleController.text != '' && urlController.text != '' && selectedItem == 'Link'){
            type = 2;
            await DatabaseHelper.instance.add(
              Shortcut(name: titleController.text, type: type, todo: urlController.text),
            );
            Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Home()),
                    );
          }else if(titleController.text != '' && imagePath != '' && selectedItem == 'Image'){
            type = 1;
            await DatabaseHelper.instance.add(
              
              Shortcut(name: titleController.text, type: type, todo: imagePath),
            );
            Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Home()),
                    );
          }else if(titleController.text != '' && noteController.text != '' && selectedItem == 'Note'){
            type = 3;
            await DatabaseHelper.instance.add(
              Shortcut(name: titleController.text, type: type, todo: noteController.text),
            );
            Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Home()),
                    );
          }else{
            controlMissing();
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




  void pickImage() async{
    XFile? image = await ImagePicker().pickImage(source: ImageSource.gallery);
    if(image != null){
      imagePath = image.path;
      setState(() {
        
      });
    }
  }









controlMissing() {


    if (selectedItem == 'Image') {
      if (titleController.text == '' && imagePath == '') {
        showDialog(
          context: context,
          builder: (context) {
            return const AlertDialog(
              // Retrieve the text the that user has entered by using the
              // TextEditingController.
              content: Text(
                "Missing parts:\n - Title\n - Image",
                style:
                    TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            );
          },
        );
        return;
      } else if (titleController.text == '' && imagePath != '') {
        showDialog(
          context: context,
          builder: (context) {
            return const AlertDialog(
              // Retrieve the text the that user has entered by using the
              // TextEditingController.
              content: Text(
                "Missing parts:\n - Title",
                style:
                    TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            );
          },
        );
        return;
      } else if (titleController.text != '' && imagePath == '') {
        showDialog(
          context: context,
          builder: (context) {
            return const AlertDialog(
              // Retrieve the text the that user has entered by using the
              // TextEditingController.
              content: Text(
                "Missing parts:\n - Image",
                style:
                    TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            );
          },
        );
        return;
      }
    } 
    
    
    else if (selectedItem == 'Link') {
      if (titleController.text == '' && urlController.text == '') {
        showDialog(
          context: context,
          builder: (context) {
            return const AlertDialog(
              // Retrieve the text the that user has entered by using the
              // TextEditingController.
              content: Text(
                "Missing parts:\n - Title\n - Url",
                style:
                    TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            );
          },
        );
        return;
      } else if (titleController.text == '' && urlController.text != '') {
        showDialog(
          context: context,
          builder: (context) {
            return const AlertDialog(
              // Retrieve the text the that user has entered by using the
              // TextEditingController.
              content: Text(
                "Missing parts:\n - Title",
                style:
                    TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            );
          },
        );
        return;
      } else if (titleController.text != '' && urlController.text == '') {
        showDialog(
          context: context,
          builder: (context) {
            return const AlertDialog(
              // Retrieve the text the that user has entered by using the
              // TextEditingController.
              content: Text(
                "Missing parts:\n - Url",
                style:
                    TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            );
          },
        );
        return;
      } 
    }
      
      
      
      else if (selectedItem == 'Note') {
        if (titleController.text == '' && noteController.text == '') {
          showDialog(
            context: context,
            builder: (context) {
              return const AlertDialog(
                // Retrieve the text the that user has entered by using the
                // TextEditingController.
                content: Text(
                  "Missing parts:\n - Title\n - Notes",
                  style:
                      TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                ),
              );
            },
          );
          return;
        } else if (titleController.text == '' && noteController.text != '') {
          showDialog(
            context: context,
            builder: (context) {
              return const AlertDialog(
                // Retrieve the text the that user has entered by using the
                // TextEditingController.
                content: Text(
                  "Missing parts:\n - Title",
                  style:
                      TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                ),
              );
            },
          );
          return;
        } else if (titleController.text != '' && noteController.text == '') {
          showDialog(
            context: context,
            builder: (context) {
              return const AlertDialog(
                // Retrieve the text the that user has entered by using the
                // TextEditingController.
                content: Text(
                  "Missing parts:\n - Notes",
                  style:
                      TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                ),
              );
            },
          );
          return;
        }
      
      }
    }
  }




class loadButton extends StatelessWidget {
  loadButton({ Key? key , required this.onClick, required this.nameText, required this.icon}) : super(key: key);
  VoidCallback onClick;
  Widget nameText;
  Icon icon;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClick,
      child: Container(
        decoration: BoxDecoration(
          color: secondaryColor,
          borderRadius: const BorderRadius.all(Radius.circular(10)),
        ),
        margin: const EdgeInsets.only(left: 20, right: 20, top: 5),
        padding: const EdgeInsets.all(10.0),
        child: ListTile(
          trailing: CircleAvatar(
            foregroundColor: Colors.white,
            backgroundColor: Colors.transparent,
            child: icon,
          ),
          title: nameText,
          textColor: Colors.white,
        ),
      ),
    );
  }
}






















