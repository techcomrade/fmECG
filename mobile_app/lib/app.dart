import 'package:bluetooth_ecg/features/authentication/bloc/authentication_bloc.dart';
import 'package:bluetooth_ecg/features/authentication/bloc/authentication_event.dart';
import 'package:bluetooth_ecg/features/authentication/bloc/authentication_state.dart';
import 'package:bluetooth_ecg/features/authentication/repository/authentication_repo.dart';
import 'package:bluetooth_ecg/features/authentication/view/login2_screen.dart';
import 'package:bluetooth_ecg/screens/login_screen/log_in_screen.dart';
import 'package:bluetooth_ecg/screens/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => AuthenticationBloc(authRepository: AuthRepository()),
      child: const BlocNavigate(),
    );
  }
}

class BlocNavigate extends StatefulWidget {
  const BlocNavigate({Key? key}) : super(key: key);

  @override
  State<BlocNavigate> createState() => _BlocNavigateState();
}

class _BlocNavigateState extends State<BlocNavigate> {
  @override
  void initState() {
    context.read<AuthenticationBloc>().add(CheckAutoLogin());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthenticationBloc, AuthenticationState>(
      builder: (context, state) {
        print(state);
        // if (state is AuthenticationSuccess) {
        //   return const MainScreen();
        // } else if (state is AuthenticationLoading) {
        //   return const CircularProgressIndicator();
        // } else {
        //   return const Login2Screen();
        // }
        return const MainScreen();
      },
    );
  }
}
