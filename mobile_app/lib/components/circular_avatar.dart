import 'package:flutter/material.dart';

class CircularAvatar extends StatelessWidget {
  final String imageAsset;
  final double radius;

  CircularAvatar({required this.imageAsset, this.radius = 10.0});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: radius * 2,
      height: radius * 2,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
      ),
      child: Image.asset(imageAsset),
    );
  }
}