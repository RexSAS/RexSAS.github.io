import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';



class Shortcut {
  final int? id;
  final String name;
  final int type;
  final String todo;

  Shortcut({this.id,required this.name,required this.type, required this.todo});

  factory Shortcut.fromMap(Map<String, dynamic> json) => new Shortcut(
    id: json['id'],
    name: json['name'],
    type: json['type'],
    todo: json['todo'],
  );

  Map<String, dynamic> toMap() {
    return{
      'id': id,
      'name': name,
      'type': type,
      'todo': todo,
    };
  }
}




class DatabaseHelper { 

  DatabaseHelper._privateConstructor();
  static final DatabaseHelper instance = DatabaseHelper._privateConstructor();

  static Database? _database;
  Future<Database> get database async => _database ??= await _initDatabase();

  Future<Database> _initDatabase() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = join(documentsDirectory.path, 'Shortcuts.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }


  Future _onCreate(Database db, int version) async{
    await db.execute('''CREATE TABLE shortcuts (id INTEGER PRIMARY KEY, 
          name TEXT, type INTEGER, todo TEXT)''');
  }

  Future<List<Shortcut>> getShortcuts() async {
    Database db = await instance.database;
    var shortcuts = await db.query('shortcuts', orderBy: 'name');
    List<Shortcut> shortcutList = shortcuts.isNotEmpty ? shortcuts.map((c) => Shortcut.fromMap(c)).toList() : [];
    return shortcutList;
  }

  Future<int> add(Shortcut shortcut) async{
    Database db = await instance.database;
    return await db.insert('shortcuts', shortcut.toMap());
  }

  Future<int> remove(int id) async {
    Database db = await instance.database;
    return await db.delete('shortcuts', where: 'id = ?', whereArgs: [id]);
  }

  Future<int> update(Shortcut shortcut) async {
    Database db = await instance.database;
    return await db.update('shortcuts', shortcut.toMap(),
        where: "id = ?", whereArgs: [shortcut.id]);
  }
}