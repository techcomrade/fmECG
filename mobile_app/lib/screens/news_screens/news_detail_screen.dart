import 'package:bluetooth_ecg/providers/news_provider.dart';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:provider/provider.dart';
import 'package:flutter_html/flutter_html.dart';

class NewsDetailScreen extends StatefulWidget {
  const NewsDetailScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<NewsDetailScreen> createState() => _NewsDetailScreenState();
}

class _NewsDetailScreenState extends State<NewsDetailScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final String contentNewsInHTML =
        context.read<NewsProvider>().selectedContentNews;
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
            icon: Icon(PhosphorIcons.regular.arrowArcLeft),
            onPressed: () => Navigator.pop(context)),
      ),
      body: SingleChildScrollView(
          child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Html(
          data: contentNewsInHTML,
          style: {"p": Style(fontSize: FontSize.larger)},
        ),
      )),
    );
  }
}
