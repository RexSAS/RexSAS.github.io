import 'dart:io';

import 'package:flutter/material.dart';
import 'package:photo_view/photo_view.dart';
import 'home.dart';

class photo_view extends StatelessWidget {
  final String path;
  const photo_view({Key? key, required this.path}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: InteractiveViewer(
          clipBehavior: Clip.none,
          child: Image.file(File(path)),
        )
      ),
    );
  }
}