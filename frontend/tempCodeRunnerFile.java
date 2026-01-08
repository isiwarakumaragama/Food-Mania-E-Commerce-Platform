public class Cp {
    public static void main(String[] args) {
        // Assuming you have specific values for these variables
        double i = 0.5; //Moment Of Inertia
        double h = 1.0; //distance Between It Center Of Gravity
        double m = 2.0; //mass
        double g = 9.8; //acceleration Of Gravity

        // Calculate compound pendulum
        double T = 2 * Math.PI * Math.sqrt( i / (m * g * h));

        System.out.println(T);
    }
}
